import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../abstractions/AppError';
import env from '@/config/env';

export function safeJwtVerify<T>(token: string): T {
	try {
		const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as T;
		return decoded;
	} catch (err) {
		throw new UnauthorizedError('Invalid token');
	}
}
