import env from './src/config/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/db/schema/index.ts',
	out: './src/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		host: env!.DB_IP,
		port: Number(env!.DB_PORT),
		user: env!.DB_USER,
		password: env!.DB_PASSWORD,
		database: env!.DB_DATABASE,
		ssl: env!.DB_SSL_REQUIRED ? { rejectUnauthorized: false } : false,
	},
	verbose: true,
	strict: true,
	casing: 'snake_case',
	migrations: {
		prefix: 'timestamp',
	},
});
