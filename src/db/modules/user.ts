import { genSaltSync, hashSync } from "bcrypt-ts";
import { db } from "src/db/db";
import { users } from "src/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email));
}
