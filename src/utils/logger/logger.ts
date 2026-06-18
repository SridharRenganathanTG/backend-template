import * as appInsights from 'applicationinsights';
import env from './../../config/env';

const connectionString = env.APPLICATIONINSIGHTS_CONNECTION_STRING;

let client: appInsights.TelemetryClient | undefined;

if (connectionString) {
	appInsights.setup(connectionString).start();
	client = appInsights.defaultClient;
}

type Meta = Record<string, unknown>;

const toProperties = (...metas: (Meta | undefined)[]): Record<string, string> => {
	const properties: Record<string, string> = {};
	for (const meta of metas) {
		if (!meta) continue;
		for (const [key, value] of Object.entries(meta)) {
			properties[key] =
				typeof value === 'string' ? value : JSON.stringify(value);
		}
	}
	return properties;
};

export interface Logger {
	child(defaults: Meta): Logger;
	debug(message: string, meta?: Meta): void;
	info(message: string, meta?: Meta): void;
	warn(message: string, meta?: Meta): void;
	error(message: string, meta?: Meta): void;
}

const createLogger = (defaults: Meta = {}): Logger => {
	const trace = (
		severity: appInsights.KnownSeverityLevel,
		message: string,
		meta?: Meta,
	) => {
		const properties = toProperties(defaults, meta);
		if (client) {
			client.trackTrace({ message, severity, properties });
		} else {
			// No connection string configured (e.g. local dev) — fall back to console.
			console.log(`[${severity}] ${message}`, properties);
		}
	};

	return {
		child: (childDefaults) =>
			createLogger({ ...defaults, ...childDefaults }),
		debug: (message, meta) =>
			trace(appInsights.KnownSeverityLevel.Verbose, message, meta),
		info: (message, meta) =>
			trace(appInsights.KnownSeverityLevel.Information, message, meta),
		warn: (message, meta) =>
			trace(appInsights.KnownSeverityLevel.Warning, message, meta),
		error: (message, meta) => {
			const { error, ...rest } = meta ?? {};
			const properties = toProperties(defaults, rest, { message });
			if (client && error instanceof Error) {
				client.trackException({
					exception: error,
					severity: appInsights.KnownSeverityLevel.Error,
					properties,
				});
			} else if (client) {
				client.trackTrace({
					message,
					severity: appInsights.KnownSeverityLevel.Error,
					properties,
				});
			} else {
				console.error(`[Error] ${message}`, properties, error ?? '');
			}
		},
	};
};

const logger = createLogger();

export default logger;
