import { html } from 'https://esm.sh/htm/preact';
import Button from './Button.js';

function Sidebar({ theme, toggleTheme }) {
	const themeIcon = {
		light: './assets/icon-moon.svg',
		dark: './assets/icon-sun.svg',
	};

	return html`
		<aside
			class="bg-dark-2 rounded-tr-3xl rounded-br-3xl fixed flex flex-col w-24 h-full pb-6 overflow-hidden">
			<span
				class="bg-primary rounded-br-3xl relative inline-flex w-full h-24 overflow-hidden">
				<img
					class="w-9 h-9 z-10 m-auto"
					src="./assets/logo.svg"
					alt="Invoice App Logo" />
				<span
					class="h-1/2 bg-logo rounded-tl-3xl absolute bottom-0 w-full"></span>
			</span>

			<span class="flex flex-col items-center gap-5 mt-auto">
				<${Button} variant="ghostSecondary" onClick=${toggleTheme}>
					<img src=${themeIcon[theme]} alt="Theme toggler" />
				</${Button}>
				<div class="h-[1px] bg-light-3 w-full"></div>
				<button class="w-10 h-10 overflow-hidden rounded-full cursor-pointer">
					<img
						src="./assets/image-avatar.jpg"
						alt="User avatar"
						class="hover:grayscale-50" />
				</button>
			</span>
		</aside>
	`;
}

export default Sidebar;