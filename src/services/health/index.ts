import { Router } from 'express';
import { healthController } from './health.controller';

const healthRouter: ReturnType<typeof Router> = Router();

healthRouter.get('/check', healthController);

export default healthRouter;
