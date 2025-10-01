const jwt = require('jsonwebtoken');

exports.handler = async function handler(event) {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' };
  headers['Access-Control-Allow-Origin'] = event.headers.origin || '*';
  if (event.httpMethod !== 'GET') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };

  try {
    const cookieHeader = event.headers.cookie || '';
    const cookies = Object.fromEntries(cookieHeader.split(';').map(c => c.trim().split('=')));
    const token = cookies.auth_token || (event.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!token) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return { statusCode: 200, headers, body: JSON.stringify({ user: payload }) };
  } catch (e) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }
};
