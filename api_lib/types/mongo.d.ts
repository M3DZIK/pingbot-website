export interface CachedMongo {
  conn: typeof import('mongoose') | null;
  promise: Promise<typeof import('mongoose')> | null;
}

export interface URLSchema {
  url: string;
}
