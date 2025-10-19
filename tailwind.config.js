/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    '**/*.{html,css,js}',
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

        // Tip calculator colors
        'tip-calculator-strong-cyan': 'hsl(172, 67%, 45%)',
        'tip-calculator-very-dark-cyan': 'hsl(183, 100%, 15%)',
        'tip-calculator-dark-grayish-cyan': 'hsl(186, 14%, 43%)',
        'tip-calculator-grayish-cyan': 'hsl(184, 14%, 56%)',
        'tip-calculator-light-grayish-cyan': 'hsl(185, 41%, 84%)',
        'tip-calculator-very-light-grayish-cyan': 'hsl(189, 41%, 97%)',
        'tip-calculator-white': 'hsl(0, 0%, 100%)',
        // Rock paper scissors
        'rps-rock-gradient-start': 'hsl(349, 71%, 52%)',
        'rps-rock-gradient-end': 'hsl(349, 70%, 56%)',
        'rps-scissors-gradient-start': 'hsl(39, 89%, 49%)',
        'rps-scissors-gradient-end': 'hsl(40, 84%, 53%)',
        'rps-paper-gradient-start': 'hsl(230, 89%, 62%)',
        'rps-paper-gradient-end': 'hsl(230, 89%, 65%)',
        'rps-lizard-gradient-start': 'hsl(261, 73%, 60%)',
        'rps-lizard-gradient-end': 'hsl(261, 72%, 63%)',
        'rps-cyan-gradient-start': 'hsl(189, 59%, 53%)',
        'rps-cyan-gradient-end': 'hsl(189, 58%, 57%)',
        'rps-dark-text': 'hsl(229, 25%, 31%)',
        'rps-score-text': 'hsl(229, 64%, 46%)',
        'rps-header-outline': 'hsl(217, 16%, 45%)',
        'rps-radial-gradient-start': 'hsl(214, 47%, 23%)',
        'rps-radial-gradient-end': 'hsl(237, 49%, 15%)',
      },
      fontFamily: {
        body: ['Open sans', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
        space: ['"Space Mono"', 'monospace'],
        barlow: ['Barlow Semi Condensed', 'sans-serif'],
      },
      backgroundImage: {
        'fylo-mobile-bg': "url('./images/bg-curvy-mobile.svg')",
        'fylo-desktop-bg': "url('./images/bg-curvy-desktop.svg')",
        'radial-gradient': 'radial-gradient(circle at 50% 75%, hsl(214, 47%, 23%), hsl(237, 49%, 15%))',
      },
      boxShadow: {
        innerColor: '0 0 0px 30px hsl(222, 44%, 70%) inset',
        darkInnerColor: '0 0 0px 1000px hsl(222, 41%, 20%) inset',
        'rps-inner-shadow': 'inset 0 -6px 0px rgba(0,0,0,0.35)',
        'rps-winner-shadow': '0 0 0px 40px rgba(255, 255, 255, 0.05), 0 0 0px 80px rgba(255, 255, 255, 0.03), 0 0 0px 120px rgba(255, 255, 255, 0.01), inset 0 -6px 0px rgba(0,0,0,0.35)',
      },
      keyframes: {
        spread: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.05),inset 0 -6px 0px rgba(0,0,0,0.35)' },
          '100%': { boxShadow: '0 0 0px 40px rgba(255, 255, 255, 0.05), 0 0 0px 80px rgba(255, 255, 255, 0.03), 0 0 0px 120px rgba(255, 255, 255, 0.01), inset 0 -6px 0px rgba(0,0,0,0.35)' },
        },
      },
      animation: {
        'spread-shadow': 'spread 1s ease-in-out forwards',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        '.min-h-900px': { minHeight: '900px' },
        '@media (min-height: 900px)': {
          '.min-h-100vh': { minHeight: '100vh' },
        },
      };
      addUtilities(newUtilities, ['responsive']);
    },
  ],
};
