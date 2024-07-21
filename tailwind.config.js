/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'**/*.{html,css,js}',
		// Add more project folders as needed
	],
	theme: {
		extend: {
			colors: {
				white: 'hsl(0, 0%, 100%)',
				'fylo-blue-intro': 'hsl(217, 28%, 15%)',
				'fylo-blue-main': 'hsl(218, 28%, 13%)',
				'fylo-blue-footer': 'hsl(216, 53%, 9%)',
				'fylo-blue-testimonials': 'hsl(219, 30%, 18%)',
				'fylo-cyan-call-to-action': 'hsl(176, 68%, 64%)',
				'fylo-blue-call-to-action': 'hsl(198, 60%, 50%)',
				'fylo-light-red-error': 'hsl(0, 100%, 63%)',
			},
			fontFamily: {
				body: ['Open sans', 'sans-serif'],
				heading: ['Raleway', 'sans-serif'],
			},
			backgroundImage: {
				'fylo-mobile-bg': "url('./images/bg-curvy-mobile.svg')",
				'fylo-desktop-bg': "url('/images/bg-curvy-desktop.svg')",
			},
		},
	},
	plugins: [],
};
