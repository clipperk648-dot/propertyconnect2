const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { getDb } = require('../../api/lib/mongo');

exports.handler = async function handler(event) {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' };
  headers['Access-Control-Allow-Origin'] = event.headers.origin || '*';
  headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };

  try {
    const body = JSON.parse(event.body || '{}');
    const { email, password } = body;
    if (!email || !password) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing email or password' }) };

    const db = await getDb();
    if (!db) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Database not configured' }) };
    const users = db.collection('users');

    const user = await users.findOne({ email: String(email).toLowerCase() });
    if (!user) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid credentials' }) };

    const ok = await bcrypt.compare(String(password), user.passwordHash || '');
    if (!ok) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid credentials' }) };

    const publicUser = { id: user._id, fullName: user.fullName, email: user.email, phoneNumber: user.phoneNumber, role: user.role };
    const token = jwt.sign(publicUser, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    headers['Set-Cookie'] = cookie.serialize('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });

    return { statusCode: 200, headers, body: JSON.stringify({ user: publicUser }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
