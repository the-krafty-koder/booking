import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './apps/backend/src/db/schema.ts',
  out: './apps/backend/src/db/generated',
});
