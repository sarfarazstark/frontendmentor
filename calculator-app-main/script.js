const body = document.querySelector('body');
const themeSwitch = document.querySelector('.theme-switch');
const header = document.querySelector('header');
const screen = document.querySelector('.screen');
const screenOutput = screen.querySelector('input');
const keys = document.querySelector('.keys');

let currentTheme = localStorage.getItem('theme') || 'theme-1';

const hideToggleBtn = () => {
	themeSwitch.querySelectorAll('button>div').forEach((btnDiv) => {
		btnDiv.classList.add('opacity-0');
	});
};

const toggleClasses = (element, themeClasses) => {
	element.classList.remove('text-dark', 'text-white', 'text-light-yellow');
	element.classList.add(themeClasses);
};

const themeClasses = {
	'theme-1': { header: 'text-white', screen: 'text-white', keys: 'text-dark' },
	'theme-2': { header: 'text-dark', screen: 'text-dark', keys: 'text-dark' },
	'theme-3': {
		header: 'text-light-yellow',
		screen: 'text-light-yellow',
		keys: 'text-light-yellow',
	},
};

const themeChangeHelper = (theme) => {
	toggleClasses(header, themeClasses[theme].header);
	toggleClasses(screen, themeClasses[theme].screen);
	toggleClasses(keys, themeClasses[theme].keys);
};

const themeSwitchHandler = function (e) {
	const btn = e.closest('button');
	if (!btn) return;
	hideToggleBtn();
	btn.querySelector('div').classList.remove('opacity-0');
	body.classList.replace(currentTheme, btn.dataset.theme);
	currentTheme = btn.dataset.theme;
	localStorage.setItem('theme', currentTheme);
	themeChangeHelper(currentTheme);
};

document.addEventListener('DOMContentLoaded', () => {
	body.classList.add(currentTheme);
	themeChangeHelper(currentTheme);
	hideToggleBtn();
	themeSwitchHandler(
		themeSwitch.querySelector(`[data-theme="${currentTheme}"]`)
	);
});

themeSwitch.addEventListener('click', (e) => {
	themeSwitchHandler(e.target);
});

let calcArray = [];
const regexFirst = /^[\*/\.]$/;
const regex = /[\+\-\/\*]$/;

keys.addEventListener('click', (e) => {
	let key = e.target.closest('button');
	if (!key) return;
	key.textContent = key.textContent.trim();

	switch (key.textContent) {
		case 'reset':
			screenOutput.value = '';
			calcArray = [];
			screen.classList.remove('border-2');
			break;
		case 'del':
			screenOutput.value = screenOutput.value.slice(0, -1);
			calcArray.pop();
			screen.classList.remove('border-2');
			break;
		case '=':
			if (calcArray.length === 0) return;

			if (regexFirst.test(calcArray.at(0)) || regex.test(calcArray.at(-1))) {
				screen.classList.add('border-2');
				return;
			}
			screen.classList.remove('border-2');

			screenOutput.value = new Intl.NumberFormat('en-IN').format(
				eval(calcArray.join('')) || 0
			);
			calcArray = [];
			break;
		default:
			screenOutput.value += key.textContent;
			calcArray.push(key.textContent === '×' ? '*' : key.textContent);
			break;
	}
});
