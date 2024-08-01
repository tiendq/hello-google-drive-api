import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DB_URL);

export async function connectDb(name) {
  if (!client.isConnected)
    await client.connect();

  const db = client.db(process.env.DB_NAME);
  return name ? db.collection(name) : db;
}
