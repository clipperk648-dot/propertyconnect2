export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ status: 'ok', timestamp: Date.now(), version: '1.0.0' });
}
