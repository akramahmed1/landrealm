import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const c = await createConnection(process.env.DATABASE_URL!);

// Drop unique constraint
try {
  await c.execute('DROP INDEX idx_zoning_unique ON zoning_rules');
  console.log('Dropped idx_zoning_unique');
} catch (e) {
  console.log('Index may not exist:', (e as Error).message);
}

// Delete data from tables (can't truncate due to FK constraints)
await c.execute('SET FOREIGN_KEY_CHECKS = 0');
const tables = ['zoning_rules', 'contractors', 'overlay_layers', 'regulatory_alerts'];
for (const t of tables) {
  await c.execute(`DELETE FROM ${t}`);
  console.log('Cleared', t);
}
await c.execute('SET FOREIGN_KEY_CHECKS = 1');

await c.end();
console.log('Schema fix complete');
