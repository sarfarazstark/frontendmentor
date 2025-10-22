import { html } from 'https://esm.sh/htm/preact';

const dateTransformed = (date, type = 'en-UK') =>
	new Date(date).toLocaleDateString(type, {
		year: 'numeric',
		day: 'numeric',
		month: 'short',
	});

const statusEl = {
	paid: () => html`
		<div
			class="flex items-center justify-center w-30 gap-2 px-4 py-3 sm:py-4 pb-2.5 bg-paid-secondary rounded-md">
			<span
				class="inline-block w-2 h-2 bg-paid-primary rounded-full mb-0.5"></span>
			<span
				class="inline-block leading-3 text-paid-primary sm:text-lg font-semibold capitalize"
				>paid</span
			>
		</div>
	`,
	pending: () => html`
		<div
			class="flex items-center justify-center w-30 gap-2 px-4 py-3 sm:py-4 pb-2.5 bg-pending-secondary rounded-md">
			<span
				class="inline-block w-2 h-2 bg-pending-primary rounded-full mb-0.5"></span>
			<span
				class="inline-block leading-3 text-pending-primary sm:text-lg font-semibold capitalize"
				>pending</span
			>
		</div>
	`,
	draft: () => html`
		<div
			class="flex items-center justify-center w-30 gap-2 px-4 py-3 sm:py-4 pb-2.5 bg-draft-secondary rounded-md">
			<span
				class="inline-block w-2 h-2 bg-draft-primary rounded-full mb-0.5"></span>
			<span
				class="inline-block leading-3 text-draft-primary sm:text-lg font-semibold capitalize"
				>draft</span
			>
		</div>
	`,
};

function truncateString(str, maxLength, ending = '...') {
	if (str.length <= maxLength) {
		return str;
	}
	// Adjust maxLength to account for the ending
	const truncatedLength = maxLength - ending.length;
	if (truncatedLength < 0) {
		// Handle cases where maxLength is too small for the ending
		return ending.substring(0, maxLength); // Return only the ending, truncated
	}
	return str.substring(0, truncatedLength) + ending;
}

export { dateTransformed, statusEl, truncateString };
