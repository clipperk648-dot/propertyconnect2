const { getDb, isConfigured } = require('./lib/mongo');
const { ObjectId } = require('mongodb');

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
      const { id, city, type, limit = 50 } = req.query || {};
      if (id) {
        try {
          const _id = ObjectId.isValid(id) ? new ObjectId(id) : id;
          const doc = await col.findOne({ _id });
          if (!doc) return res.status(404).json({ error: 'not found' });
          return res.status(200).json({ item: { ...doc, id: String(doc._id) } });
        } catch (e) {
          return res.status(500).json({ error: e && e.message ? e.message : 'lookup failed' });
        }
      }
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
      const propertyCategoryRaw = body.propertyType || body.propertyCategory || body.type || 'selfcon';
      const propertyType = slugify(propertyCategoryRaw);
      const propertyTypeLabel = String(body.propertyTypeLabel || propertyCategoryRaw).trim();
      const description = String(body.description || '').trim();
      const forSale = body.forSale != null ? Boolean(body.forSale) : false;
      const forRent = body.forRent != null ? Boolean(body.forRent) : !forSale;
      const listingType = String(body.listingType || (forSale && !forRent ? 'sale' : 'rent')).toLowerCase();
      const priceType = String(body.priceType || (listingType === 'sale' ? 'sale' : 'month')).toLowerCase();
      const images = Array.isArray(body.images) ? body.images.filter(Boolean) : [];
      const image = body.image || images[0] || '';
      const videos = Array.isArray(body.videos) ? body.videos.filter(Boolean) : [];
      const video = body.video || videos[0] || '';
      const amenities = Array.isArray(body.amenities) ? body.amenities : [];
      const status = String(body.status || 'active');
      const ownerId = body.ownerId ? String(body.ownerId) : '';
      const applicationStatus = body.applicationStatus ? String(body.applicationStatus) : 'Not Applied';
      const views = Number(body.views || 0);
      const inquiries = Number(body.inquiries || 0);
      const favorites = Number(body.favorites || 0);

      if (!title || !location || !price) {
        return res.status(400).json({ error: 'title, location and price are required' });
      }

      const doc = {
        title,
        description,
        location,
        city,
        price,
        type: listingType,
        listingType,
        priceType,
        propertyType,
        propertyTypeLabel,
        bedrooms,
        bathrooms,
        sqft,
        area: sqft,
        images,
        image,
        videos,
        video,
        amenities,
        status,
        forSale,
        forRent,
        ownerId,
        applicationStatus,
        views,
        inquiries,
        favorites,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await col.insertOne(doc);
      const saved = { ...doc, _id: result.insertedId, id: String(result.insertedId) };
      return res.status(201).json({ item: saved });
    }

    if (req.method === 'PUT') {
      const body = req.body || {};
      const id = body.id || body._id;
      if (!id) return res.status(400).json({ error: 'id is required for update' });
      const update = {};
      const allowed = ['title','description','location','city','price','type','listingType','priceType','propertyType','propertyTypeLabel','bedrooms','bathrooms','sqft','area','images','image','videos','video','amenities','status','forSale','forRent','ownerId','views','inquiries','favorites','applicationStatus'];
      for (const k of allowed) {
        if (Object.prototype.hasOwnProperty.call(body, k)) update[k] = body[k];
      }
      update.updatedAt = new Date();
      try {
        const _id = ObjectId.isValid(id) ? new ObjectId(id) : id;
        const result = await col.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' });
        const item = result.value || null;
        if (!item) return res.status(404).json({ error: 'not found' });
        item.id = String(item._id);
        return res.status(200).json({ item });
      } catch (err) {
        return res.status(500).json({ error: err && err.message ? err.message : 'update failed' });
      }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (e) {
    return res.status(200).json({ items: [], total: 0, source: 'error', error: e && e.message ? e.message : 'unknown error' });
  }
};
