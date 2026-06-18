import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../abstractions/AppError';
import { safeJwtVerify } from '@/utils/jwt-validation';

export type AccessTokenType = {
	id: string;
	name: string;
	email: string;
	phone: string;
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token =
			req.cookies['accessToken'] ??
			req.headers.authorization?.split(' ')[1];

		if (!token) throw new UnauthorizedError('Token not found');

		const result = safeJwtVerify<AccessTokenType>(token);

		if (!result.success) throw new UnauthorizedError('Invalid token');

		req.user = result.data;
		
		next();
	} catch (err) {
		return next(err);
	}
};

export default protect;
