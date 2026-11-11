 export function formatDates(start: Date | null, end: Date | null) {
	if (!start || !end) return "";
	const fmt = new Intl.DateTimeFormat("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	});
	return fmt.formatRange(start, end);
}