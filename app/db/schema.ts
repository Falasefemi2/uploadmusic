/** @format */

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
