import { text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable(
	'users',
	{
		id: uuid().primaryKey().defaultRandom(),

		name: text(),

		email: text(),

		phone: text(),

		createdAt: timestamp('created_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
);
