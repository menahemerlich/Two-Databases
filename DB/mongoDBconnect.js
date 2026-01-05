import { MongoClient } from "mongodb";

let client
let DB

export async function connectMongo(uri, dbName) {
    if (DB) return DB
    client = new MongoClient(uri)
    await client.connect()
    DB = client.db(dbName)
    console.log("MongoDB connected:", DB.databaseName);
    return DB
}

export const db = await connectMongo(
        process.env.MONGO_URI, 
        process.env.DB_NAME)

