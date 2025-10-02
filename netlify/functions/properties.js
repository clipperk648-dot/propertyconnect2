const { getDb, isConfigured } = require('../../api/lib/mongo');
const { ObjectId } = require('mongodb');
const { getDb, isConfigured } = require('../../api/lib/mongo');

function slugify(val) {
  return String(val || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

exports.handler = async function handler(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': event.headers?.origin || '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (!isConfigured) {
    return { statusCode: 200, headers, body: JSON.stringify({ items: [], total: 0, source: 'unconfigured' }) };
  }

  try {
    const db = await getDb();
    const col = db.collection('properties');

    if (event.httpMethod === 'GET') {
      const params = event.queryStringParameters || {};
      const { id, city, type } = params;
      const limit = Number(params.limit || 50);

      if (id) {
        try {
          const _id = ObjectId.isValid(id) ? new ObjectId(id) : id;
          const doc = await col.findOne({ _id });
          if (!doc) return { statusCode: 404, headers, body: JSON.stringify({ error: 'not found' }) };
          return { statusCode: 200, headers, body: JSON.stringify({ item: { ...doc, id: String(doc._id) } }) };
        } catch (e) {
          return { statusCode: 500, headers, body: JSON.stringify({ error: e && e.message ? e.message : 'lookup failed' }) };
        }
      }

      const query = {};
      if (city) query.city = { $regex: new RegExp(String(city), 'i') };
      if (type) query.propertyType = String(type);

      const docs = await col.find(query).limit(limit).toArray();
      return { statusCode: 200, headers, body: JSON.stringify({ items: docs, total: docs.length, source: 'mongodb' }) };
    }

    if (event.httpMethod === 'POST') {
      const body = event.body ? JSON.parse(event.body) : {};
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
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'title, location and price are required' }) };
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
      return { statusCode: 201, headers, body: JSON.stringify({ item: saved }) };
    }

    if (event.httpMethod === 'PUT') {
      const body = event.body ? JSON.parse(event.body) : {};
      const id = body.id || body._id;
      if (!id) return { statusCode: 400, headers, body: JSON.stringify({ error: 'id is required for update' }) };
      const allowed = ['title','description','location','city','price','type','listingType','priceType','propertyType','propertyTypeLabel','bedrooms','bathrooms','sqft','area','images','image','videos','video','amenities','status','forSale','forRent','ownerId','views','inquiries','favorites','applicationStatus'];
      const update = {};
      for (const k of allowed) {
        if (Object.prototype.hasOwnProperty.call(body, k)) update[k] = body[k];
      }
      update.updatedAt = new Date();
      try {
        const _id = ObjectId.isValid(id) ? new ObjectId(id) : id;
        const result = await col.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' });
        const item = result.value || null;
        if (!item) return { statusCode: 404, headers, body: JSON.stringify({ error: 'not found' }) };
        item.id = String(item._id);
        return { statusCode: 200, headers, body: JSON.stringify({ item }) };
      } catch (err) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: err && err.message ? err.message : 'update failed' }) };
      }
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  } catch (e) {
    return { statusCode: 200, headers, body: JSON.stringify({ items: [], total: 0, source: 'error', error: e && e.message ? e.message : 'unknown error' }) };
  }
};
