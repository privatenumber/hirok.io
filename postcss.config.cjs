const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	plugins: {
		'tailwindcss/nesting': {},
		tailwindcss: {},
		autoprefixer: {},
		...(isProduction ? { cssnano: {} } : {}),
	},
};
