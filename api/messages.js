const { getDb, isConfigured } = require('./lib/mongo.js');

const { getDb, isConfigured } = require('./lib/mongo');

function parseBody(raw) {
  if (!raw) return {};
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return raw;
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!isConfigured) {
    return res.status(200).json({ items: [], total: 0, source: 'unconfigured' });
  }

  try {
    const db = await getDb();
    const col = db.collection('messages');

    if (req.method === 'POST') {
      const body = parseBody(req.body);
      const propertyId = body?.propertyId ? String(body.propertyId) : '';
      const content = String(body?.message || body?.content || '').trim();

      if (!propertyId || !content) {
        return res.status(400).json({ error: 'propertyId and message are required' });
      }

      const now = new Date();
      const sender = {
        name: String(body?.senderName || body?.sender?.name || 'Tenant Applicant'),
        email: String(body?.senderEmail || body?.sender?.email || ''),
        phone: String(body?.senderPhone || body?.sender?.phone || ''),
      };
      const recipient = {
        name: String(body?.recipientName || body?.recipient?.name || 'Property Owner'),
        email: String(body?.recipientEmail || body?.recipient?.email || ''),
        phone: String(body?.recipientPhone || body?.recipient?.phone || ''),
      };
      const images = Array.isArray(body?.images) ? body.images.filter(Boolean) : [];
      const videos = Array.isArray(body?.videos) ? body.videos.filter(Boolean) : [];
      const propertySnapshot = body?.propertySnapshot && typeof body.propertySnapshot === 'object' ? body.propertySnapshot : {};
      const listingType = String(body?.listingType || body?.propertyListingType || '').toLowerCase();

      const messageDoc = {
        propertyId,
        propertyTitle: String(body?.propertyTitle || ''),
        propertyAddress: String(body?.propertyAddress || ''),
        listingType,
        sender,
        recipient,
        content,
        type: String(body?.type || 'application'),
        channel: String(body?.channel || 'tenant-dashboard'),
        status: 'sent',
        attachments: { images, videos },
        propertySnapshot,
        createdAt: now,
        updatedAt: now,
      };

      const result = await col.insertOne(messageDoc);
      const saved = { ...messageDoc, id: String(result.insertedId), _id: result.insertedId };
      return res.status(201).json({ item: saved });
    }

    if (req.method === 'GET') {
      const docs = await col.find({}).sort({ createdAt: -1 }).limit(100).toArray();
      const items = docs.map((doc) => ({ ...doc, id: String(doc._id) }));
      return res.status(200).json({ items, total: items.length, source: 'mongodb' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (e) {
    return res.status(200).json({ items: [], total: 0, source: 'error', error: e && e.message ? e.message : 'unknown error' });
  }
};
