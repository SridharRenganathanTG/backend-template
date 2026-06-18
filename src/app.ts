import express from 'express';
import env from './config/env';
import router from './route';

export const bootstrap = async () => {
	const app = express();
	const port = env.PORT || 8000;

	app.use(express.json());

	app.use('/api', router);

	app.listen(port, () => {
		console.log(`${env.APPLICATION_NAME} app listening on port ${port}`);
	});
};
