import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../../drizzle/schema";

const db = drizzle({
  connection: { uri: process.env.DATABASE_URL! },
  schema,
  mode: "planetscale",
});

export type db = typeof db;

export { db };
