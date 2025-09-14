import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
export const isConfigured = Boolean(uri);

let client;
let clientPromise;

export async function getDb() {
  if (!isConfigured) return null;

  if (!clientPromise) {
    client = new MongoClient(uri, {
      // leave defaults; Vercel functions create/close sockets per invocation, we cache the client
    });
    clientPromise = client.connect();
  }

  const conn = await clientPromise;
  const dbNameFromEnv = process.env.MONGODB_DB;
  let dbName = dbNameFromEnv;
  if (!dbName) {
    try {
      const parsed = new URL(uri);
      const path = parsed.pathname?.replace(/^\//, '') || '';
      dbName = path || 'appdb';
    } catch {
      dbName = 'appdb';
    }
  }
  return conn.db(dbName);
}

export async function ping() {
  if (!isConfigured) return { ok: false, reason: 'MONGODB_URI not set' };
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e?.message || 'ping failed' };
  }
}
