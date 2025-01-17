import { date, pgTable, time, varchar, serial } from 'drizzle-orm/pg-core';

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  date: date('date').notNull(),
  start: time('start').notNull(),
  end: time('end').notNull(),
});

export const schedule = pgTable('schedule', {
  id: serial('id').primaryKey(),
  day: varchar('day', { length: 20 }).notNull(),
  start: time('start').notNull(),
  end: time('end').notNull(),
});
