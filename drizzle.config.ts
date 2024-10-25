/** @format */

import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Change this line if using .env.local
dotenv.config({ path: ".env.local" }); // or just dotenv.config() for .env

if (!process.env.NEON_DATABASE_URL)
  throw new Error("NEON DATABASE_URL not found in environment");

export default {
  schema: "./app/db/schema.ts",
  out: "./app/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL,
  },
  strict: true,
} satisfies Config;
