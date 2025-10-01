const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { getDb } = require('../lib/mongo');

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const cookies = Object.fromEntries((req.headers.cookie || '').split(';').map(c => c.trim().split('=')));
    const token = cookies.auth_token || (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');

    if (req.method === 'GET') {
      return res.status(200).json({ user: payload });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const { fullName } = req.body || {};
      if (!fullName || !String(fullName).trim()) return res.status(400).json({ error: 'fullName is required' });

      const db = await getDb();
      if (!db) return res.status(500).json({ error: 'Database not configured' });
      const users = db.collection('users');
      const email = payload.email;
      await users.updateOne({ email: String(email).toLowerCase() }, { $set: { fullName: String(fullName).trim(), updatedAt: new Date() } });

      const updatedUser = { ...payload, fullName: String(fullName).trim() };
      const newToken = jwt.sign(updatedUser, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
      res.setHeader('Set-Cookie', cookie.serialize('auth_token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }));
      return res.status(200).json({ user: updatedUser, token: newToken });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
