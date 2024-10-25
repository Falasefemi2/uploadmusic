/** @format */

"use server";

import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./db/schema";

export async function upsertUser(
  email: string,
  imageUrl: string,
  username: string
) {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      await db
        .update(users)
        .set({
          image: imageUrl,
        })
        .where(eq(users.id, existingUser[0].id));
    } else {
      await db.insert(users).values({
        email,
        image: imageUrl,
        createdAt: new Date(),
        name: username,
      });
    }
  } catch (error) {
    console.error("Error upserting user:", error);
    throw error;
  }
}
