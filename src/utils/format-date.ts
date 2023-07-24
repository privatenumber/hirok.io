export const formatDate = (
	date: string | Date,
	detailed?: boolean,
) => {
	if (typeof date === 'string') {
		date = new Date(date);
	}

	return date.toLocaleDateString(
		'en-US',
		{
			year: 'numeric',
			month: 'short',
			day: detailed ? 'numeric' : undefined,
			weekday: detailed ? 'long' : undefined,
		},
	);
};
