import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: process.env.POSTGRES_HOST || "",
    user: process.env.POSTGRES_USER,
    ssl: "require",
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE || "",
  },
});
