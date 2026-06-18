import env from '@/config/env';
import DrizzleWinstonLogger from '@/utils/logger/drizzleLogger';
import logger from '@/utils/logger/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';


const pool = new Pool({
	host: env.DB_IP,
	port: Number(env.DB_PORT),
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_DATABASE,
	ssl: env.DB_SSL_REQUIRED ? { rejectUnauthorized: false } : undefined,
	max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
});


export const db = drizzle(pool, {
	schema,
	logger: new DrizzleWinstonLogger(),
	casing: 'snake_case',
});

export type dbConnection = typeof db;
export const testConnection = async () => {
	try {
		await db.execute('SELECT 1');
		logger.debug('Database connection established successfully.');
	} catch (err) {
		logger.error('Unable to connect to the database:', err as any);
		throw err;
	}
};