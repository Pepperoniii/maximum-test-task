import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI || "";
const client = new MongoClient(url);

let dbInstance: MongoClient | null = null;

export async function connectDB() {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client;
    console.log("Connected to MongoDB");

    return dbInstance;
  }
  return dbInstance;
}
