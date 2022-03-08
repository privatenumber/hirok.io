export const formatDate = (
	date: string | Date,
) => {
	if (typeof date === 'string') {
		date = new Date(date);
	}

	return date.toLocaleDateString(
		'en-US',
		{
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		},
	);
};
