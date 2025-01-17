import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { config } from 'dotenv';
import path from 'path';

config({
  path: path.join(__dirname, '../../.env'),
});

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);
const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'apps/backend/src/db/generated',
    });
    console.log('success');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
