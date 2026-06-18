import { pgEnum } from 'drizzle-orm/pg-core';

export const userTypeEnum = pgEnum('role', [
	'admin',
	'manager',
	'bartender',
	'waiter',
	'customer',
]);

export const statusEnum = pgEnum('status', ['active', 'inactive', 'pending']);
