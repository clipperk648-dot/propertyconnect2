const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const isConfigured = Boolean(uri);

let client;
let clientPromise;

async function getDb() {
  if (!isConfigured) return null;

  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  const conn = await clientPromise;
  const dbNameFromEnv = process.env.MONGODB_DB;
  let dbName = dbNameFromEnv;
  if (!dbName) {
    try {
      const parsed = new URL(uri);
      const path = parsed.pathname ? parsed.pathname.replace(/^\//, '') : '';
      dbName = path || 'appdb';
    } catch {
      dbName = 'appdb';
    }
  }
  return conn.db(dbName);
}

async function ping() {
  if (!isConfigured) return { ok: false, reason: 'MONGODB_URI not set' };
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e && e.message ? e.message : 'ping failed' };
  }
}

module.exports = { getDb, ping, isConfigured };
