import { html } from 'https://esm.sh/htm/preact';
import Button from './Button.js';

function Sidebar({ theme, toggleTheme }) {
	const themeIcon = {
		light: './assets/icon-moon.svg',
		dark: './assets/icon-sun.svg',
	};

	return html`
		<aside
			class="bg-dark-2 rounded-tr-3xl md:rounded-tr-none md:rounded-bl-3xl rounded-br-3xl fixed md:top-0 md:right-0 md:left-0 flex flex-col md:flex-row w-24 md:w-full h-full md:h-16 md:justify-between items-center pb-6 md:pb-0 md:pr-6 overflow-hidden md:z-50">
			<span
				class="bg-primary rounded-br-3xl relative inline-flex w-full md:w-24 h-24 md:h-full items-center justify-center overflow-hidden">
				<img
					class="w-9 h-9 z-10 m-auto"
					src="./assets/logo.svg"
					alt="Invoice App Logo" />
				<span
					class="h-1/2 bg-logo rounded-tl-3xl absolute bottom-0 w-full"></span>
			</span>

			<span class="flex flex-col md:flex-row items-center gap-5 mt-auto md:mt-0 md:ml-auto md:h-full">
				<${Button} variant="ghostSecondary" onClick=${toggleTheme}>
					<img src=${themeIcon[theme]} alt="Theme toggler" />
				</${Button}>
				<div class="h-[1px] md:h-full bg-light-3 w-full md:w-[1px]"></div>
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
