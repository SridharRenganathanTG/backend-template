import { z } from 'zod';
import 'dotenv/config';

const stringBoolean = z
	.string()
	.transform((val) => {
		return val === 'true';
	})
	.default(false);

const envSchema = z.object({
	APPLICATION_NAME: z.string(),

	NODE_ENV: z.enum(['local', 'dev', 'qas', 'prod']).default('local'),

	PORT: z.coerce.number().default(8000),

	APPLICATIONINSIGHTS_CONNECTION_STRING: z.string().optional(),

	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_DATABASE: z.string(),
	DB_IP: z.string(),
	DB_PORT: z.coerce.number().default(5432),
	DB_DIALECT: z
		.enum(['postgres', 'mysql', 'mariadb', 'sqlite', 'mssql'])
		.default('postgres'),
	DB_SSL_REQUIRED: stringBoolean,
	DB_MIGRATING: stringBoolean,
	DB_SEEDING: stringBoolean,

	ACCESS_TOKEN_SECRET: z.string().min(1),
	ACCESS_TOKEN_EXPIRES_IN: z.string().default('15m'),

	REFRESH_TOKEN_SECRET: z.string().min(1),
	REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),

	COOKIE_DOMAIN: z.string().optional(),

	TZ: z.string().default('UTC'),

	CF_ACCOUNT_ID: z.string().optional(),
	CF_IMAGES_API_TOKEN: z.string().optional(),
	CF_ACCOUNT_HASH: z.string().optional(),
});

export function initEnv() {
	try {
		const validatedEnv = envSchema.parse(process.env);
		if (process.env.TZ !== validatedEnv.TZ) {
			process.env.TZ = validatedEnv.TZ;
		}

		const result = validatedEnv as Readonly<z.infer<typeof envSchema>>;
		return result;
	} catch (err) {
		if (err instanceof z.ZodError) {
			console.log(z.prettifyError(err));
		} else {
			console.error('Unexpected environment error:', err);
		}
		process.exit(1);
	}
}

export default initEnv();
