const toFixed = (
	value: number,
	precision: number,
) => {
	const power = 10 ** precision;
	return Math.round(value * power) / power;
};

export const getUnit = (
	value: number,
	units: {
		label: string;
		value: number;
	}[],
	precision?: number,
): [value: number, unit?: string] => {
	const unit = units.find(u => value >= u.value);
	return unit
		? [
			toFixed(value / unit.value, precision ?? 2),
			unit.label,
		]
		: [value];
};

export const timeUnits = [
	{
		label: 'year',
		value: 60 * 60 * 24 * 365,
	},
	{
		label: 'month',
		value: 60 * 60 * 24 * 30,
	},
	{
		label: 'day',
		value: 60 * 60 * 24,
	},
	{
		label: 'hour',
		value: 60 * 60,
	},
	{
		label: 'minute',
		value: 60,
	},
	{
		label: 'second',
		value: 1,
	},
];

export const numberUnits = [
	{
		label: 'billion',
		value: 1e9,
	},
	{
		label: 'million',
		value: 1e6,
	},
	{
		label: 'thousand',
		value: 1e3,
	},
];

export const shortNumberUnits = [
	{
		label: 'B',
		value: 1e9,
	},
	{
		label: 'M',
		value: 1e6,
	},
	{
		label: 'K',
		value: 1e3,
	},
];
