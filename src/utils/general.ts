export function formatUptime(seconds: number) {
	const mins = Math.floor(seconds / 60);
	const hrs = Math.floor(mins / 60);
	if (hrs > 0) return `${hrs}h ${mins % 60}m ${Math.floor(seconds % 60)}s`;
	if (mins > 0) return `${mins}m ${Math.floor(seconds % 60)}s`;
	return `${Math.floor(seconds)}s`;
}