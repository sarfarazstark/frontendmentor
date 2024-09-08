/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'**/*.{html,css,js}',
		// Add more project folders as needed
	],
	theme: {
		extend: {
			textColor: {
				dark: 'var(--text-dark)',
				white: 'var(--text-white)',
				'light-yellow': 'var(--text-light-yellow)',
			},
			backgroundColor: {
				main: 'var(--background-main)',
				toggle: 'var(--background-toggle)',
				screen: 'var(--background-screen)',
				'function-key': 'var(--function-key-background)',
				'key-toggle': 'var(--key-toggle)',
				key: 'var(--key)',
			},
			boxShadow: {
				'key-shadow': '0 4px 0 var(--key-shadow)',
				'function-key-shadow': '0 4px 0 var(--function-key-shadow)',
				'key-toggle-shadow': '0 4px 0 var(--key-toggle-shadow)',
			},
			fontFamily: {
				ls: "'League Spartan', 'sans serif'",
			},
		},
	},
};
