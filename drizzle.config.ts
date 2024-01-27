import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.local" : ".env",
});

export default {
  schema: "./db/schema.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_AUTH_TOKEN as string,
  },
} satisfies Config;
