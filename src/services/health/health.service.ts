import { testConnection } from '@/db';
import { formatUptime } from '@/utils/general';

export const checkHealth = async () => {
	const data = {
		uptime: formatUptime(process.uptime()),
		timestamp: new Date().toISOString(),
		status: 'ok' as const,
		checks: { db: 'ok' },
	};
	try {
		await testConnection();
		data.checks.db = 'ok';
	} catch (error) {
        data.checks.db = 'error';
    }
    return data;
};
