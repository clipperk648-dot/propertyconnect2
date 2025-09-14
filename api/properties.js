import { getDb, isConfigured } from './lib/mongo.js';

const fallback = [
  { id: 1, title: 'Modern Apartment in Downtown', price: 3200, beds: 2, baths: 2, sqft: 1100, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop', city: 'Seattle', state: 'WA' },
  { id: 2, title: 'Cozy Suburban House', price: 2400, beds: 3, baths: 2, sqft: 1450, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop', city: 'Bellevue', state: 'WA' },
  { id: 3, title: 'Luxury Condo with View', price: 5200, beds: 2, baths: 2, sqft: 1350, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', city: 'Kirkland', state: 'WA' }
];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const { city, type, limit = 50 } = req.query || {};

  if (!isConfigured) {
    return res.status(200).json({ items: [], total: 0, source: 'unconfigured' });
  }

  try {
    const db = await getDb();
    const col = db.collection('properties');
    const query = {};
    if (city) query.city = { $regex: new RegExp(String(city), 'i') };
    if (type) query.propertyType = String(type);

    const docs = await col.find(query).limit(Number(limit)).toArray();
    return res.status(200).json({ items: docs, total: docs.length, source: 'mongodb' });
  } catch (e) {
    return res.status(200).json({ items: [], total: 0, source: 'error', error: e?.message });
  }
}
