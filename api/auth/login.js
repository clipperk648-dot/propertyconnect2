const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { getDb } = require('../lib/mongo');

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

    const db = await getDb();
    const users = db.collection('users');

    const user = await users.findOne({ email: String(email).toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(String(password), user.passwordHash || '');
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const publicUser = { id: user._id, fullName: user.fullName, email: user.email, phoneNumber: user.phoneNumber, role: user.role };
    const token = jwt.sign(publicUser, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    }));

    return res.status(200).json({ user: publicUser });
  } catch (e) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
