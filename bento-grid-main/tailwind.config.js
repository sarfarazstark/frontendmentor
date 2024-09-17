/** @type {import('tailwindcss').Config} */
module.exports = {
	experimental: {
		optimizeUniversalDefaults: true,
	},
	content: [
		'**/*.{html,css,js}',
		// Add more project folders as needed
	],
	theme: {
		extend: {
			colors: {
				purple: {
					100: 'hsl(254, 88%, 90%)',
					500: 'hsl(256, 67%, 59%)',
				},
				yellow: {
					100: 'hsl(31, 66%, 93%)',
					500: 'hsl(39, 100%, 71%)',
				},
				white: 'hsl(0, 0%, 100%)',
				black: 'hsl(0, 0%, 7%)',
			},
			fontFamily: {
				dmsans: ['DM Sans', 'sans-serif'],
			},
			screen: {
				lg: '1440px',
			},
		},
	},
	plugins: [],
};
