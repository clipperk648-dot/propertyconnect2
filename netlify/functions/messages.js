const { getDb, isConfigured } = require('../../api/lib/mongo.js');

const { getDb, isConfigured } = require('../../api/lib/mongo');

exports.handler = async function handler(event) {
  const headers = { 'Content-Type': 'application/json' };
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  if (!isConfigured) {
    return { statusCode: 200, headers, body: JSON.stringify({ items: [], total: 0, source: 'unconfigured' }) };
  }

  try {
    const db = await getDb();
    const col = db.collection('messages');
    const docs = await col.find({}).limit(100).toArray();
    return { statusCode: 200, headers, body: JSON.stringify({ items: docs, total: docs.length, source: 'mongodb' }) };
  } catch (e) {
    return { statusCode: 200, headers, body: JSON.stringify({ items: [], total: 0, source: 'error', error: e && e.message ? e.message : 'unknown error' }) };
  }
}
