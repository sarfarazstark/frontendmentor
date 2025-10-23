import { html } from 'https://esm.sh/htm/preact';
import { useEffect, useRef } from 'https://esm.sh/preact/hooks';

function DatePicker({ value, onChange }) {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) return;
		const fp = flatpickr(ref.current, {
			dateFormat: 'Y-m-d',
			defaultDate: value,
			disableMobile: true,

			onChange: (selected) => {
				onChange(selected[0].toISOString().split('T')[0]);
			},
		});
		return () => fp.destroy();
	}, []);

	return html`
		<input
			ref=${ref}
			type="text"
			value=${value}
			class="w-full min-w-0 box-border bg-light-row px-3 py-2 rounded-md border border-light-primary/10 focus:ring focus:ring-primary focus:outline-0" />
	`;
}

export default DatePicker;
