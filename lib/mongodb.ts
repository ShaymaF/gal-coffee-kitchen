// lib/mongodb.ts
import mongoose from "mongoose"

const MONGODB_URI = "mongodb://localhost:27017/clictable_dev" 
// process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local")
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  namespace NodeJS {
    interface Global {
      mongoose?: MongooseCache;
    }
  }
}

let cached: MongooseCache = (global as typeof globalThis & { mongoose: MongooseCache }).mongoose

if (!cached) {
  cached = (global as typeof globalThis & { mongoose?: MongooseCache }).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false
    }).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
