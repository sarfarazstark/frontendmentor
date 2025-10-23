import { html } from 'https://esm.sh/htm/preact';
import { useEffect, useRef } from 'https://esm.sh/preact/hooks';

function DatePicker({ value, id, onChange, readonly = false }) {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) return;
		const fp = flatpickr(ref.current, {
			dateFormat: 'Y-m-d',
			altFormat: 'd M Y',
			altInput: true,
			defaultDate: value,
			disableMobile: true,
			clickOpens: !readonly,
			onChange: (selected) => {
				onChange(selected[0].toISOString().split('T')[0]);
			},
		});
		return () => fp.destroy();
	}, [readonly, value]);

	return html`
		<div class="relative w-full">
			<input
				id=${id}
				ref=${ref}
				type="text"
				value=${value}
				readonly=${readonly}
				class="w-full min-w-0 box-border bg-light-row px-3 py-2 pt-3 leading-tight rounded-md border-light-primary/10 outline-none focus:outline-0 ${readonly
					? 'border-2 focus:ring-0 focus:ring-gray-400 opacity-40'
					: 'border focus:ring focus:ring-primary'} pr-10" />

			<img
				src="./assets/icon-calendar.svg"
				alt=""
				class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
		</div>
	`;
}

export default DatePicker;
