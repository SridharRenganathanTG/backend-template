import { SuccessResponse } from '@/abstractions/apiResponse';
import type { Request, Response } from 'express';
import { checkHealth } from './health.service';

export const healthController = async (_req: Request, res: Response) => {
	const healthData = await checkHealth();
	new SuccessResponse(res, 'Health check successful', healthData).send();
	return new SuccessResponse(res, 'Health check successful', healthData);
};
