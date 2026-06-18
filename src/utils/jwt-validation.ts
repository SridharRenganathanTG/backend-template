import jwt from 'jsonwebtoken';
import env from '../config/env';
import { UnauthorizedError } from '../abstractions/AppError';

export function safeJwtVerify<T>(token: string): T {
	try {
		const decoded = jwt.verify(token, env.ACCESS_JWT_SECRET) as T;
		return decoded;
	} catch (err) {
		throw new UnauthorizedError('Invalid token');
	}
}
