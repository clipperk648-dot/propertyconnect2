const { getDb, isConfigured } = require('./lib/mongo.js');

const { getDb, isConfigured } = require('./lib/mongo');

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  if (!isConfigured) {
    return res.status(200).json({ items: [], total: 0, source: 'unconfigured' });
  }

  try {
    const db = await getDb();
    const col = db.collection('messages');
    const docs = await col.find({}).limit(100).toArray();
    return res.status(200).json({ items: docs, total: docs.length, source: 'mongodb' });
  } catch (e) {
    return res.status(200).json({ items: [], total: 0, source: 'error', error: e && e.message ? e.message : 'unknown error' });
  }
};
