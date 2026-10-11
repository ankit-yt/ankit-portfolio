import { MongoClient } from 'mongodb';

let connection;
export async function getVisitsCollection() {
  if (!process.env.MONGODB_URI) throw new Error('MongoDB is not configured');
  if (!connection) {
    const client = new MongoClient(process.env.MONGODB_URI, {
      maxPoolSize: 3, serverSelectionTimeoutMS: 5000,
    });
    connection = client.connect().catch(async error => {
      connection = undefined;
      await client.close();
      throw error;
    });
  }
  const client = await connection;
  return client.db(process.env.MONGODB_DB || 'portfolio').collection('stats');
}
