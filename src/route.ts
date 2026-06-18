import { Router } from 'express';
import healthRouter from './services/health';

const router: Router = Router();

router.use('/health', healthRouter);

export default router;
