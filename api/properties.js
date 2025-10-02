const { getDb, isConfigured } = require('./lib/mongo');

function slugify(val) {
  return String(val || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!isConfigured) {
    return res.status(200).json({ items: [], total: 0, source: 'unconfigured' });
  }

  try {
    const db = await getDb();
    const col = db.collection('properties');

    if (req.method === 'GET') {
      const { city, type, limit = 50 } = req.query || {};
      const query = {};
      if (city) query.city = { $regex: new RegExp(String(city), 'i') };
      if (type) query.propertyType = String(type);

      const docs = await col.find(query).limit(Number(limit)).toArray();
      return res.status(200).json({ items: docs, total: docs.length, source: 'mongodb' });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const title = String(body.title || '').trim();
      const location = String(body.location || '').trim();
      const city = String(body.city || location).trim();
      const price = Number(body.price || 0);
      const bedrooms = Number(body.bedrooms || body.beds || 0);
      const bathrooms = Number(body.bathrooms || body.baths || 0);
      const sqft = Number(body.sqft || body.area || 0);
      const typeRaw = body.type || body.propertyType || 'selfcon';
      const propertyType = slugify(typeRaw);
      const images = Array.isArray(body.images) ? body.images.filter(Boolean) : [];
      const image = body.image || images[0] || '';
      const amenities = Array.isArray(body.amenities) ? body.amenities : [];
      const status = String(body.status || 'active');

      if (!title || !location || !price) {
        return res.status(400).json({ error: 'title, location and price are required' });
      }

      const doc = {
        title,
        location,
        city,
        price,
        type: propertyType,
        propertyType,
        bedrooms,
        bathrooms,
        sqft,
        area: sqft,
        images,
        image,
        amenities,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await col.insertOne(doc);
      const saved = { ...doc, _id: result.insertedId, id: String(result.insertedId) };
      return res.status(201).json({ item: saved });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (e) {
    return res.status(200).json({ items: [], total: 0, source: 'error', error: e && e.message ? e.message : 'unknown error' });
  }
};
