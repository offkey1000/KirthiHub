
import { pgTable, text, varchar, real, integer, jsonb, timestamp, pgEnum, uuid } from 'drizzle-orm/pg-core';

export const urgencyEnum = pgEnum('urgency', ['Low', 'Medium', 'High']);
export const stageEnum = pgEnum('stage', ['Pending', 'WIP', 'Completed']);
export const statusEnum = pgEnum('status', ['Active', 'Inactive']);

export const users = pgTable('users', {
  id: varchar('id', { length: 256 }).primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  status: statusEnum('status').notNull(),
  code: varchar('code', { length: 6 }).notNull().unique(),
});

export const jobs = pgTable('jobs', {
    id: varchar('id', { length: 256 }).primaryKey(),
    title: text('title').notNull(),
    orderType: text('orderType').notNull(),
    customerOrderNumber: text('customerOrderNumber'),
    urgency: urgencyEnum('urgency').notNull(),
    budget: real('budget').notNull(),
    ornamentType: text('ornamentType').notNull(),
    goldWeight: real('goldWeight').notNull(),
    diamondWeight: real('diamondWeight').notNull(),
    stoneWeight: real('stoneWeight').notNull(),
    description: text('description').notNull(),
    images: jsonb('images').$type<string[]>().default([]).notNull(),
    status: text('status').notNull(),
    stage: stageEnum('stage').notNull(),
    history: jsonb('history').$type<{ user: string; action: string; timestamp: string }[]>().default([]).notNull(),
    assignedTo: varchar('assignedTo', { length: 256 }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
