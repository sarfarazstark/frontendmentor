import { html } from 'https://esm.sh/htm/preact';
import Button from './Button.js';

function Sidebar({ theme, toggleTheme }) {
	const themeIcon = {
		light: './assets/icon-moon.svg',
		dark: './assets/icon-sun.svg',
	};

	return html`
		<aside
			class="bg-dark-2 fixed flex justify-between w-full h-20 items-center overflow-hidden z-50">
			<span
				class="bg-primary rounded-br-3xl rounded-tr-3xl relative inline-flex w-24 h-full items-center justify-center overflow-hidden">
				<img
					class="w-9 h-9 z-10 m-auto"
					src="./assets/logo.svg"
					alt="Invoice App Logo" />
				<span
					class="h-1/2 bg-logo rounded-tl-3xl absolute bottom-0 w-full"></span>
			</span>

			<span class="flex flex-row items-center gap-5 mr-6">
				<${Button} variant="ghostSecondary" onClick=${toggleTheme}>
					<img src=${themeIcon[theme]} alt="Theme toggler" />
				</${Button}>
				<div class="h-full bg-light-3 w-[1px]"></div>
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
