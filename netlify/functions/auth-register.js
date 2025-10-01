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
    const { fullName, email, password, phoneNumber, role } = body;
    if (!fullName || !email || !password || !phoneNumber || !role) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const db = await getDb();
    if (!db) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Database not configured' }) };
    const users = db.collection('users');
    const existing = await users.findOne({ email: String(email).toLowerCase() });
    if (existing) return { statusCode: 409, headers, body: JSON.stringify({ error: 'Email already in use' }) };

    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = { fullName: String(fullName).trim(), email: String(email).toLowerCase().trim(), phoneNumber: String(phoneNumber).trim(), role: String(role), passwordHash, createdAt: new Date(), updatedAt: new Date() };
    const result = await users.insertOne(user);
    const publicUser = { id: result.insertedId, fullName: user.fullName, email: user.email, phoneNumber: user.phoneNumber, role: user.role };

    const token = jwt.sign(publicUser, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    headers['Set-Cookie'] = cookie.serialize('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });

    return { statusCode: 201, headers, body: JSON.stringify({ user: publicUser }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
