import { ping, isConfigured } from './lib/mongo.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let db = { configured: isConfigured };
  if (isConfigured) {
    const r = await ping();
    db = { ...db, ...r };
  }
  return res.status(200).json({ status: 'ok', timestamp: Date.now(), version: '1.0.0', db });
}
