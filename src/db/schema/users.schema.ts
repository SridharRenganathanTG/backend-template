import {
	date,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import { statusEnum, userTypeEnum } from './enum';

export const users = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),

	name: text(),

	email: text(),

	phone: text(),

	role: userTypeEnum().default('customer'),

	dateOfBirth: date(),
	ageVerifiedAt: date(),

	metadata: jsonb('metadata').$type<{
		acceptedTermsAndConditions: boolean;
		marketingOptIn: boolean;
	}>(),

	status: statusEnum().default('pending'),

	createdAt: timestamp('created_at', { withTimezone: true })
		.defaultNow()
		.notNull(),
});
