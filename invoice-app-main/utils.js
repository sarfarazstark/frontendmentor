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
			class="flex items-center justify-center w-30 gap-2 px-4 py-3 pb-2.5 bg-paid-secondary rounded-md">
			<span
				class="inline-block w-2 h-2 bg-paid-primary rounded-full mb-0.5"></span>
			<span
				class="inline-block leading-3 text-paid-primary font-semibold capitalize"
				>paid</span>
			</div>
	`,
	pending: () => html`
		<div
			class="flex items-center justify-center w-30 gap-2 px-4 py-3 pb-2.5 bg-pending-secondary rounded-md">
			<span
				class="inline-block w-2 h-2 bg-pending-primary rounded-full mb-0.5"></span>
			<span
				class="inline-block leading-3 text-pending-primary font-semibold capitalize"
				>pending</span>
			</div>
	`,
	draft: () => html`
		<div
			class="flex items-center justify-center w-30 gap-2 px-4 py-3 pb-2.5 bg-draft-secondary rounded-md">
			<span
				class="inline-block w-2 h-2 bg-draft-primary rounded-full mb-0.5"></span>
			<span
				class="inline-block leading-3 text-draft-primary font-semibold capitalize"
				>draft</span>
			</div>
	`,
};

export { dateTransformed, statusEl };