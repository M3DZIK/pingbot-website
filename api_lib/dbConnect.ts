import { connect } from 'mongoose';
import { CachedMongo } from './types/mongo';

const { MONGODB_URI } = process.env;

let cached: CachedMongo = global.mongo;

if (!cached) {
  cached = global.mongo = {
    conn: null,
    promise: null
  };
}

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connect(MONGODB_URI as string);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}
