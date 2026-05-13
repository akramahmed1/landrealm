import { createConnection } from "mysql2/promise";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL not set");
  const c = await createConnection(dbUrl);

  console.log("Applying schema changes...");

  // Check existing columns on users table
  const [cols] = await c.execute("SHOW COLUMNS FROM users");
  const colNames = (cols as any[]).map((c: any) => c.Field);
  console.log("  users columns:", colNames.join(", "));

  // Add missing columns
  if (!colNames.includes("union_id")) {
    await c.execute("ALTER TABLE users ADD COLUMN union_id VARCHAR(255) UNIQUE");
    console.log("  + union_id");
  }
  if (!colNames.includes("last_sign_in_at")) {
    await c.execute("ALTER TABLE users ADD COLUMN last_sign_in_at DATETIME(3)");
    console.log("  + last_sign_in_at");
  }

  // Make email nullable
  await c.execute("ALTER TABLE users MODIFY COLUMN email VARCHAR(255) UNIQUE");
  console.log("  ~ email nullable");

  // Remove unique constraint from prompt_templates if exists
  try {
    await c.execute("ALTER TABLE prompt_templates DROP INDEX prompt_templates_feature_unique");
    console.log("  - dropped unique on prompt_templates.feature");
  } catch {
    // may not exist
  }

  // Add idx_zoning_unique if not exists
  const [indexes] = await c.execute("SHOW INDEX FROM zoning_rules WHERE Key_name = 'idx_zoning_unique'");
  if ((indexes as any[]).length === 0) {
    // Must truncate to add unique constraint
    await c.execute("TRUNCATE TABLE zoning_rules");
    await c.execute("ALTER TABLE zoning_rules ADD UNIQUE INDEX idx_zoning_unique (jurisdiction_code, zone_code)");
    console.log("  + idx_zoning_unique (table truncated)");
  }

  await c.end();
  console.log("Schema changes applied.");
}

main().catch(console.error);
