import { bootstrap } from './app';

process.env.TZ = 'UTC';

bootstrap().catch((err) => {
	console.error('Error during bootstrap:', err);
	process.exit(1);
}).then(() => {
	console.log('Server started successfully');
});
