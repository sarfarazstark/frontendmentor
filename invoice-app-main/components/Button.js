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
		'font-semibold rounded-full cursor-pointer transition-colors transition-opacity duration-300 flex items-center justify-center';

	// Text sizes with proper breakpoints
	const textSizeClasses = 'text-sm sm:text-base lg:text-lg';

	// Variant classes with responsive padding and minimal vertical spacing
	const variantClasses = {
		primary: `${textSizeClasses} bg-primary text-white px-4 sm:px-6 py-2`,
		secondary: `${textSizeClasses} bg-draft-secondary text-draft-primary px-4 sm:px-6 py-2`,
		danger: `${textSizeClasses} bg-accent-red text-white px-4 sm:px-6 py-2`,
		ghost: `${textSizeClasses} bg-dark-4 text-light-1 hover:bg-dark-4 px-4 sm:px-6 py-2 rounded-[10px]`,
		ghostSecondary: `${textSizeClasses} text-light-1 hover:bg-dark-3 px-4 sm:px-6 py-2 rounded-[10px]`,
		new: 'text-sm sm:text-base bg-primary text-white p-2 sm:p-3 gap-2',
		link: 'text-dark-1 font-semibold flex items-center gap-3 sm:gap-5 mr-auto p-0 bg-transparent hover:bg-transparent text-base sm:text-md',
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
