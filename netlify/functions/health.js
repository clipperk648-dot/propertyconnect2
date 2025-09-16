const { ping, isConfigured } = require('../../api/lib/mongo.js');

exports.handler = async function handler(event) {
  try {
    const headers = { 'Content-Type': 'application/json' };
    let db = { configured: isConfigured };
    if (isConfigured) {
      const r = await ping();
      db = { ...db, ...r };
    }
    const body = JSON.stringify({ status: 'ok', timestamp: Date.now(), version: '1.0.0', db });
    return { statusCode: 200, headers, body };
  } catch (e) {
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
}
