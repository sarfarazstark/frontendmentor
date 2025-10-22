import { html } from 'https://esm.sh/htm/preact';

function Button({
	children,
	onClick,
	variant = 'primary',
	className = '',
	type = 'button',
	...props
}) {
	const baseClasses =
		'font-semibold rounded-full cursor-pointer transition-colors transition-opacity duration-300 flex items-center justify-center sm:text-md';

	const variantClasses = {
		primary: 'bg-primary text-white px-5 sm:px-7 py-3 pb-2.5',
		secondary: 'bg-draft-secondary text-draft-primary px-5 py-3 pb-2.5',
		danger: 'bg-accent-red text-white px-5 py-3 pb-2.5',
		ghost: 'bg-dark-4 text-light-1 hover:bg-dark-4 px-5 py-3 rounded-[10px]',
		ghostSecondary: 'text-light-1 hover:bg-dark-3 px-5 py-3 rounded-[10px]',
		new: 'bg-primary text-white px-2 py-2 pr-2 gap-2',
		link: 'text-dark-1 font-semibold flex items-center gap-5 mr-auto p-0 bg-transparent hover:bg-transparent',
		none: '',
	};

	const appliedClasses =
		`${baseClasses} ${variantClasses[variant]} ${className}`.trim();

	return html`
		<button type=${type} class=${appliedClasses} onClick=${onClick} ...${props}>
			${children}
		</button>
	`;
}

export default Button;
