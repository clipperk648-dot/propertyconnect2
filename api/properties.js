const { getDb, isConfigured } = require('./lib/mongo.js');

const { getDb, isConfigured } = require('./lib/mongo');

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const { city, type, limit = 50 } = req.query || {};

  if (!isConfigured) {
    return res.status(200).json({ items: [], total: 0, source: 'unconfigured' });
  }

  try {
    const db = await getDb();
    const col = db.collection('properties');
    const query = {};
    if (city) query.city = { $regex: new RegExp(String(city), 'i') };
    if (type) query.propertyType = String(type);

    const docs = await col.find(query).limit(Number(limit)).toArray();
    return res.status(200).json({ items: docs, total: docs.length, source: 'mongodb' });
  } catch (e) {
    return res.status(200).json({ items: [], total: 0, source: 'error', error: e && e.message ? e.message : 'unknown error' });
  }
};
