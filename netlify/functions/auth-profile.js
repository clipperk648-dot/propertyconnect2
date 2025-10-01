const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { getDb } = require('../../api/lib/mongo');

exports.handler = async function handler(event) {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' };
  headers['Access-Control-Allow-Origin'] = event.headers.origin || '*';
  headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  headers['Access-Control-Allow-Methods'] = 'GET, PUT, OPTIONS';
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers };

  try {
    const cookieHeader = event.headers.cookie || '';
    const cookies = Object.fromEntries(cookieHeader.split(';').map(c => c.trim().split('=')));
    const token = cookies.auth_token || (event.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!token) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');

    if (event.httpMethod === 'GET') {
      return { statusCode: 200, headers, body: JSON.stringify({ user: payload }) };
    }

    if (event.httpMethod === 'PUT') {
      const body = JSON.parse(event.body || '{}');
      const { fullName } = body;
      if (!fullName || !String(fullName).trim()) return { statusCode: 400, headers, body: JSON.stringify({ error: 'fullName is required' }) };

      const db = await getDb();
      if (!db) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Database not configured' }) };
      const users = db.collection('users');
      const email = payload.email;
      await users.updateOne({ email: String(email).toLowerCase() }, { $set: { fullName: String(fullName).trim(), updatedAt: new Date() } });

      const updatedUser = { ...payload, fullName: String(fullName).trim() };
      const newToken = jwt.sign(updatedUser, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
      headers['Set-Cookie'] = cookie.serialize('auth_token', newToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
      return { statusCode: 200, headers, body: JSON.stringify({ user: updatedUser }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  } catch (e) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }
};
