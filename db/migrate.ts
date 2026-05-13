import { createConnection } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL not set");
  const client = await createConnection(dbUrl);
  const db = drizzle(client);

  // Run migrations
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("Migrations applied");
  await client.end();
}

main().catch(console.error);
