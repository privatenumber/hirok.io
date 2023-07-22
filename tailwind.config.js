/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',

	darkMode: 'class',

	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx,md}",
	],
	theme: {
		extend: {
			scale: {
				80: '0.8',
			},

			fontSize: {
				'1.5xl': '1.3rem',
				'2.5xl': '1.7rem'
			},

			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				background: 'rgb(var(--color-background) / <alpha-value>)',
			},

			textUnderlineOffset: {
				6: '6px',
			},
		},

		container: {
			screens: {
				DEFAULT: '1000px',
			},
		},
	},
};
