/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
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
				// Github user search app colors
				'git-user-whitish-blue': 'hsl(227, 100%, 98%)',
				'git-user-blue': 'hsl(212, 100%, 50%)',
				'git-user-blue-2': 'hsl(212, 100%, 69%)',
				'git-user-gray': 'hsl(217, 20%, 51%)',
				'git-user-gray-trans': 'hsla(217, 20%, 51%, 0.2)',
				'git-user-grayish-blue': 'hsl(217, 35%, 45%)',
				'git-user-dark-blue': 'hsl(217, 21%, 21%)',
				'git-user-navy-blue': 'hsl(222, 41%, 20%)',
				'git-user-navy-blue-2': 'hsl(222, 44%, 70%)',
				'git-user-dark-navy-blue': 'hsl(220, 40%, 13%)',
				'git-user-dark-navy-blue-2': 'hsl(220, 18%, 16%)',
				red: 'hsl(0, 91%, 62%)',
				moon: '#697C9A',
				// Github user search app colors end....
			},
			fontFamily: {
				body: ['Open sans', 'sans-serif'],
				heading: ['Raleway', 'sans-serif'],
				space: ['"Space Mono"', 'monospace'],
			},

			backgroundImage: {
				'fylo-mobile-bg': "url('./images/bg-curvy-mobile.svg')",
				'fylo-desktop-bg': "url('./images/bg-curvy-desktop.svg')",
			},
			boxShadow: {
				innerColor: '0 0 0px 30px hsl(222, 44%, 70%) inset',
				darkInnerColor: '0 0 0px 1000px hsl(222, 41%, 20%) inset',
			},
		},
	},
	plugins: [],
};
