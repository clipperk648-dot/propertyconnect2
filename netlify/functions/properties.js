const { getDb, isConfigured } = require('../../api/lib/mongo.js');

exports.handler = async function handler(event) {
  const headers = { 'Content-Type': 'application/json' };
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const params = event.queryStringParameters || {};
  const { city, type } = params;
  const limit = Number(params.limit || 50);

  if (!isConfigured) {
    return { statusCode: 200, headers, body: JSON.stringify({ items: [], total: 0, source: 'unconfigured' }) };
  }

  try {
    const db = await getDb();
    const col = db.collection('properties');
    const query = {};
    if (city) query.city = { $regex: new RegExp(String(city), 'i') };
    if (type) query.propertyType = String(type);

    const docs = await col.find(query).limit(limit).toArray();
    return { statusCode: 200, headers, body: JSON.stringify({ items: docs, total: docs.length, source: 'mongodb' }) };
  } catch (e) {
    return { statusCode: 200, headers, body: JSON.stringify({ items: [], total: 0, source: 'error', error: e && e.message ? e.message : 'unknown error' }) };
  }
}
