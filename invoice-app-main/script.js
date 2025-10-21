import { html, render } from 'https://esm.sh/htm/preact';
import { useEffect, useState, useRef } from 'https://esm.sh/preact/hooks';

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
				>paid</span
			>
		</div>
	`,
	pending: () => html`
		<div
			class="flex items-center justify-center w-30 gap-2 px-4 py-3 pb-2.5 bg-pending-secondary rounded-md">
			<span
				class="inline-block w-2 h-2 bg-pending-primary rounded-full mb-0.5"></span>
			<span
				class="inline-block leading-3 text-pending-primary font-semibold capitalize"
				>pending</span
			>
		</div>
	`,
	draft: () => html`
		<div
			class="flex items-center justify-center w-30 gap-2 px-4 py-3 pb-2.5 bg-draft-secondary rounded-md">
			<span
				class="inline-block w-2 h-2 bg-draft-primary rounded-full mb-0.5"></span>
			<span
				class="inline-block leading-3 text-draft-primary font-semibold capitalize"
				>draft</span
			>
		</div>
	`,
};

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

	const variantClasses = {
		primary: 'bg-primary text-white px-5 py-3 pb-2.5',
		secondary: 'bg-draft-secondary text-draft-primary px-5 py-3 pb-2.5',
		danger: 'bg-accent-red text-white px-5 py-3 pb-2.5',
		ghost: 'bg-dark-4 text-light-1 hover:bg-dark-1 px-5 py-3 rounded-[10px]',
		new: 'bg-primary text-white px-2 py-2 pr-5 gap-3',
		link: 'text-dark-1 font-semibold flex items-center gap-5 mr-auto p-0 bg-transparent hover:bg-transparent',
	};

	const appliedClasses = `${baseClasses} ${
		variantClasses[variant] || variantClasses.primary
	} ${className}`.trim();

	return html`
		<button type=${type} class=${appliedClasses} onClick=${onClick} ...${props}>
			${children}
		</button>
	`;
}

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
				<${Button} variant="ghost" onClick=${toggleTheme}>
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

function InvoiceList({
	invoices,
	allCount,
	filters,
	onFilterChange,
	openInvoice,
	setOpenInvoiceForm,
}) {
	const [isFilterOpen, SetIsFilterOpen] = useState(0);

	return html`
		<section class="grid grid-cols-6 grid-rows-[auto_1fr] gap-y-16 items-start">
			<header
				class="gap-14 flex items-center justify-between w-full col-span-4 col-start-2 mx-auto">
				<div class="flex flex-col justify-center gap-1">
					<h1 class="text-light-primary text-4xl font-bold leading-8">
						Invoices
					</h1>
					<small class="text-light-2"
						>There are total ${allCount} invoices</small
					>
				</div>

				<div class="relative ml-auto">
					<label
						class="group text-light-primary flex items-center gap-2 cursor-pointer select-none"
						onClick=${() => SetIsFilterOpen((prev) => !prev)}>
						Filter by status
						<img
							src="./assets/icon-arrow-down.svg"
							alt="arrow down"
							class=${`w-3 h-auto transition-all duration-300 ${
								isFilterOpen ? 'rotate-180' : ''
							}`} />
					</label>
					${
						isFilterOpen
							? html`<span
									class="inline-block text-light-primary bg-light-row w-44 -right-8 top-12 absolute p-4 rounded-md shadow-md">
									<ul
										class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 items-center">
										${['draft', 'pending', 'paid'].map(
											(name) => html`
												<li
													class="grid-cols-subgrid col-span-full grid items-center">
													<input
														type="checkbox"
														name=${name}
														id=${name}
														checked=${filters.includes(name)}
														onChange=${(e) =>
															onFilterChange(name, e.target.checked)}
														class="appearance-none w-4 h-4 border border-primary rounded-xs bg-light-1 checked:bg-[url('../assets/icon-check.svg')] checked:bg-center checked:bg-no-repeat checked:bg-primary checked:bg-[length:9px_9px]" />
													<label
														for=${name}
														class="capitalize font-semibold pt-0.5 text-md select-none"
														>${name}
													</label>
												</li>
											`,
										)}
									</ul>
							  </span>`
							: ''
					}
				</div>

				<${Button}
					variant="new"
					onClick=${() => setOpenInvoiceForm(true)}>
					<span class="p-2 bg-white rounded-full">
						<img src="./assets/icon-plus.svg" alt="Plus" class="w-2.5 h-auto" />
					</span>
					<span class="leading-1 pt-1">New Invoice</span>
				</${Button}>
			</header>

			<section class="w-full col-span-4 col-start-2">
				<ul class="w-full gap-4 grid grid-cols-[auto_auto_1fr_auto_auto_auto]">
					${invoices.map(
						(invoice) => html`
							<li
								class="grid grid-cols-subgrid border border-transparent hover:border hover:border-primary cursor-pointer col-span-full bg-light-row items-center shadow-md rounded-lg p-5 gap-x-10 select-none"
								onClick=${() => openInvoice(invoice.id)}>
								<div class="font-semibold text-light-primary">
									<span class="text-light-3">#</span>${invoice.id}
								</div>
								<div class="text-light-3">
									<small>${dateTransformed(invoice.paymentDue)}</small>
								</div>
								<div class="text-light-3">
									<small>${invoice.clientName}</small>
								</div>
								<div class="font-bold text-right text-light-primary">
									$ ${invoice.total}
								</div>
								<div>${statusEl[invoice.status]()}</div>
								<div>
									<img src="./assets/icon-arrow-right.svg" alt="View" />
								</div>
							</li>
						`,
					)}
				</ul>
			</section>
		</section>
	`;
}

function ItemInputRow({ item, onUpdate, onDelete }) {
	const { name, quantity, price, total } = item;

	return html`
		<tr>
			<td class="w-full pr-3 pb-3">
				<input
					type="text"
					name="description-${item.id}"
					value=${name}
					onInput=${(e) => onUpdate('name', e.target.value)}
					placeholder="e.g. OnePlus 12"
					class="bg-light-row px-3 py-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10 w-full" />
			</td>

			<td class="text-center pr-3 pb-3">
				<input
					type="text"
					value=${quantity}
					onInput=${(e) => onUpdate('quantity', e.target.value)}
					name="qty-${item.id}"
					class="bg-light-row px-3 py-2 rounded-md text-center focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10 w-16" />
			</td>

			<td class="text-center pr-3 pb-3">
				<input
					type="text"
					value=${price}
					onInput=${(e) => onUpdate('price', e.target.value)}
					name="price-${item.id}"
					class="bg-light-row px-3 py-2 rounded-md text-center focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10 w-16 placeholder:text-light-2/70 placeholder:font-semibold"
					placeholder="00" />
			</td>

			<td
				class="text-center text-sm text-light-2 p-2 w-24 pr-3 pb-3 font-semibold">
				${Number.isFinite(total) ? total.toFixed(2) : '0.00'}
			</td>
			<td class="w-7 h-auto pb-3">
				<a onclick=${onDelete}>
					<img src="./assets/icon-delete.svg" alt="Delete btn" />
				</a>
			</td>
		</tr>
	`;
}

function InvoiceForm({ invoice, setOpenInvoiceForm, addNewInvoice }) {
	const {
		senderAddress = {},
		clientName: rawClientName = '',
		clientEmail: rawClientEmail = '',
		clientAddress = {},
		createdAt: invoiceDateStr = '',
		paymentTerms: paymentTermsNum = 30,
		description: rawDescription = '',
		items: invoiceItems = [],
	} = invoice || {};

	const {
		street: senderStreet = '',
		city: senderCity = '',
		postCode: senderPostCode = '',
		country: senderCountry = '',
	} = senderAddress;

	const {
		street: clientStreet = '',
		city: clientCity = '',
		postCode: clientPostCode = '',
		country: clientCountry = '',
	} = clientAddress;

	const invoiceDate = invoiceDateStr
		? new Date(invoiceDateStr).toISOString().split('T')[0]
		: new Date().toISOString().split('T')[0];

	const paymentTerms = String(paymentTermsNum);

	// State
	const [sender, setSender] = useState({
		street: senderStreet,
		city: senderCity,
		postcode: senderPostCode,
		country: senderCountry,
	});

	const [client, setClient] = useState({
		name: rawClientName,
		email: rawClientEmail,
		street: clientStreet,
		city: clientCity,
		postcode: clientPostCode,
		country: clientCountry,
	});

	const [invoiceDetails, setInvoiceDetails] = useState({
		date: invoiceDate,
		paymentTerms: paymentTerms,
		description: rawDescription,
	});

	const [items, setItems] = useState(() => {
		if (Array.isArray(invoiceItems) && invoiceItems.length > 0) {
			return invoiceItems.map((item) => {
				const qty = !isNaN(Number(item.quantity)) ? Number(item.quantity) : 0;
				const price = !isNaN(Number(item.price)) ? Number(item.price) : 0;
				return {
					id: item.id || crypto.randomUUID(),
					name: item.name || '',
					quantity: qty,
					price: price,
					total: qty * price,
				};
			});
		}
		return [];
	});

	const [shadow, setShadow] = useState(true);
	const containerRef = useRef(null);

	const addItem = () => {
		setItems((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				name: '',
				quantity: 0,
				price: 0,
				total: 0,
			},
		]);
	};

	const deleteItem = (id) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	const updateItem = (id, field, value) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id !== id) return item;
				let updatedValue = value;
				if (field === 'quantity' || field === 'price') {
					updatedValue = value === '' ? 0 : Number(value);
					if (isNaN(updatedValue)) updatedValue = 0;
				}
				const newItem = { ...item, [field]: updatedValue };
				if (field === 'quantity' || field === 'price') {
					newItem.total = Number(newItem.quantity) * Number(newItem.price);
				}
				return newItem;
			}),
		);
	};

	const prevItemsLengthRef = useRef(items.length);

	useEffect(() => {
		const prevLength = prevItemsLengthRef.current;
		const currentLength = items.length;

		if (currentLength > prevLength) {
			const el = containerRef.current;
			if (el) {
				el.scrollTop = el.scrollHeight;
			}
		}

		prevItemsLengthRef.current = currentLength;
	}, [items]);

	const handleScroll = () => {
		const el = containerRef.current;
		if (!el) return;
		setShadow(el.scrollHeight - el.scrollTop > el.clientHeight + 5);
	};

	const closeForm = () => {
		setSender({ street: '', city: '', postcode: '', country: '' });
		setClient({
			name: '',
			email: '',
			street: '',
			city: '',
			postcode: '',
			country: '',
		});
		setItems([]);
		setOpenInvoiceForm(false);
	};

	const saveInvoice = (status = 'pending') => {
		const createdAt = invoice ? invoice.createdAt : invoiceDetails.date; // Use the date from form
		const paymentTerms = Number(invoiceDetails.paymentTerms);
		const dueDate = new Date(createdAt);
		dueDate.setDate(dueDate.getDate() + paymentTerms);
		const paymentDue = dueDate.toISOString().split('T')[0];

		const total = items.reduce((acc, item) => acc + item.total, 0);

		const generateInvoiceId = () => {
			const randomLetters = Array.from({ length: 2 }, () =>
				String.fromCharCode(65 + Math.floor(Math.random() * 26)),
			).join('');

			const randomNumber = 1000 + Math.floor(Math.random() * 9000);

			return `${randomLetters}${randomNumber}`;
		};

		const newInvoice = {
			...(invoice ? { id: invoice.id } : { id: generateInvoiceId() }),

			createdAt,
			paymentDue,
			paymentTerms,
			description: invoiceDetails.description,

			clientName: client.name,
			clientEmail: client.email,
			status,
			senderAddress: {
				street: sender.street,
				city: sender.city,
				postCode: sender.postcode,
				country: sender.country,
			},
			clientAddress: {
				street: client.street,
				city: client.city,
				postCode: client.postcode,
				country: client.country,
			},
			items: items.map(({ ...item }) => item),
			total,
		};

		addNewInvoice(newInvoice);
		closeForm();
	};

	return html`
		<div
			class="grid grid-cols-7 grid-rows-[auto_1fr] gap-y-16 items-start fixed top-0 bottom-0 left-0 right-0 ml-24 z-10 bg-black/50">
			<section
				class="col-span-3 row-span-full bg-light-bg overflow-y-scroll h-full"
        ref=${containerRef}
        onScroll=${handleScroll}>
				<h2 class="text-2xl font-semibold text-light-primary mb-8 px-14 pt-14">
					${invoice ? 'Edit Invoice' : 'New Invoice'}
				</h2>
				<form class="text-light-primary flex flex-col gap-3 p-14 pt-0 pb-6">
					<!-- Sender Inputs -->
					<div>
						<small class="text-primary text-sm font-semibold">Bill From</small>
						<div class="flex flex-col space-y-2 mt-3">
							<label htmlFor="street-address" class="text-xs text-light-2"
								>Street Address</label
							>
							<input
								type="text"
								name="street-address"
								id="street-address"
								value=${sender.street}
								onInput=${(e) => setSender((prev) => ({ ...prev, street: e.target.value }))}
								class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10" />
							<span class="text-accent-red text-xs invisible">Error</span>
						</div>
						<div class="grid grid-cols-3 gap-6">
							<div class="flex flex-col space-y-2">
								<label htmlFor="city" class="text-xs text-light-2"
									>City</label
								>
								<input
									type="text"
									name="city"
									id="city"
									value=${sender.city}
									onInput=${(e) => setSender((prev) => ({ ...prev, city: e.target.value }))}
									class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10"
									autocomplete="on" />
								<span class="text-accent-red text-xs invisible">Error</span>
							</div>
							<div class="flex flex-col space-y-2">
								<label htmlFor="postcode" class="text-xs text-light-2"
									>Post Code</label
								>
								<input
									type="text"
									name="postcode"
									id="postcode"
									value=${sender.postcode}
									onInput=${(e) => setSender((prev) => ({ ...prev, postcode: e.target.value }))}
									class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10" />
								<span class="text-accent-red text-xs invisible">Error</span>
							</div>
							<div class="flex flex-col space-y-2">
								<label htmlFor="country" class="text-xs text-light-2"
									>Country</label
								>
								<input
									type="text"
									name="country"
									id="country"
									value=${sender.country}
									onInput=${(e) => setSender((prev) => ({ ...prev, country: e.target.value }))}
									class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10" />
								<span class="text-accent-red text-xs invisible">Error</span>
							</div>
						</div>
					</div>
					<!-- Receiver inputs -->
					<div>
						<small class="text-primary text-sm font-semibold">Bill To</small>
						<div class="flex flex-col space-y-2 mt-3">
							<label htmlFor="name" class="text-xs text-light-2"
								>Client Name</label
							>
							<input
								type="text"
								name="name"
								id="name"
								value=${client.name}
								onInput=${(e) => setClient((prev) => ({ ...prev, name: e.target.value }))}
								class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10" />
							<span class="text-accent-red text-xs invisible">Error</span>
						</div>
						<div class="flex flex-col space-y-2 mt-3">
							<label htmlFor="email" class="text-xs text-light-2"
								>Client Email</label
							>
							<input
								type="email"
								name="email"
								id="email"
								value=${client.email}
								onInput=${(e) => setClient((prev) => ({ ...prev, email: e.target.value }))}
								class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10"
								placeholder="e.g. email@example.com" />
							<span class="text-accent-red text-xs invisible">Error</span>
						</div>
						<div class="flex flex-col space-y-2 mt-3">
							<label htmlFor="client-street-address" class="text-xs text-light-2"
								>Street Address</label
							>
							<input
								type="text"
								name="client-street-address"
								id="client-street-address"
								value=${client.street}
								onInput=${(e) => setClient((prev) => ({ ...prev, street: e.target.value }))}
								class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10" />
							<span class="text-accent-red text-xs invisible">Error</span>
						</div>
						<div class="grid grid-cols-3 gap-6">
							<div class="flex flex-col space-y-2">
								<label htmlFor="client-city" class="text-xs text-light-2"
									>City</label
								>
								<input
									type="text"
									name="client-city"
									id="client-city"
									value=${client.city}
									onInput=${(e) => setClient((prev) => ({ ...prev, city: e.target.value }))}
									class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10"
									autocomplete="on" />
								<span class="text-accent-red text-xs invisible">Error</span>
							</div>
							<div class="flex flex-col space-y-2">
								<label htmlFor="client-postcode" class="text-xs text-light-2"
									>Post Code</label
								>
								<input
									type="text"
									name="client-postcode"
									id="client-postcode"
									value=${client.postcode}
									onInput=${(e) => setClient((prev) => ({ ...prev, postcode: e.target.value }))}
									class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10" />
								<span class="text-accent-red text-xs invisible">Error</span>
							</div>
							<div class="flex flex-col space-y-2">
								<label htmlFor="client-country" class="text-xs text-light-2"
									>Country</label
								>
								<input
									type="text"
									name="client-country"
									id="client-country"
									value=${client.country}
									onInput=${(e) => setClient((prev) => ({ ...prev, country: e.target.value }))}
									class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10" />
								<span class="text-accent-red text-xs invisible">Error</span>
							</div>
						</div>
					</div>
					<!-- Invoice Details -->
					<div>
						<div class="grid grid-cols-2 gap-6">
							<div class="flex flex-col space-y-2">
								<label htmlFor="date" class="text-xs text-light-2"
									>Invoice Date</label
								>
								<input
									type="date"
									name="date"
									id="date"
                  value=${invoiceDetails.date}
									onInput=${(e) =>
										setInvoiceDetails((prev) => ({
											...prev,
											date: e.target.value,
										}))}
									class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10"
									autocomplete="on"
									placeholder=" " />
								<span class="text-accent-red text-xs invisible">Error</span>
							</div>
							<div class="flex flex-col space-y-2">
								<label htmlFor="payment-due" class="text-xs text-light-2"
									>Payment Due
								</label>
							<select
                name="payment-due"
                id="payment-due"
                value=${invoiceDetails.paymentTerms}
                onInput=${(e) =>
									setInvoiceDetails((prev) => ({
										...prev,
										paymentTerms: e.target.value,
									}))}
                class="bg-light-row text-light-primary font-medium
                      px-3 py-2 pr-8 rounded-md border border-light-primary/10
                      appearance-none bg-no-repeat
                      bg-[url('./../assets/icon-arrow-down.svg')] bg-[right_0.75rem_center]
                      hover:border-primary focus:ring focus:ring-primary/30
                      focus:outline-none transition"
              >
                <option value="1">Next 1 Day</option>
                <option value="7">Next 7 Days</option>
                <option value="14">Next 14 Days</option>
                <option value="30">Next 30 Days</option>
              </select>
								<span class="text-accent-red text-xs invisible">Error</span>
							</div>
						</div>
						<div class="flex flex-col space-y-2 mt-3">
							<label htmlFor="description" class="text-xs text-light-2"
								>Project Description</label
							>
							<input
								type="text"
								name="description"
								id="description"
								value=${invoiceDetails.description}
								onInput=${(e) =>
									setInvoiceDetails((prev) => ({
										...prev,
										description: e.target.value,
									}))}
								class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10"
								placeholder="e.g. Graphic Design Service" />
							<span class="text-accent-red text-xs invisible">Error</span>
						</div>
					</div>
          <!-- Item List -->
					<div class='space-y-2'>
						<small class="text-light-2 text-xl font-semibold">Item List</small>
            <table class="table-auto w-full mt-3">
              <thead>
                <tr>
                  <th class="text-left text-xs text-light-2 p-1 pr-3 pb-3">Item Name</th>
                  <th class="text-center text-xs text-light-2 p-1 pr-3 pb-3 whitespace-nowrap">Qty.</th>
                  <th class="text-center text-xs text-light-2 p-1 pr-3 pb-3 whitespace-nowrap">Price</th>
                  <th class="text-center text-xs text-light-2 p-1 pr-3 pb-3 whitespace-nowrap">Total</th>
                  <th class="text-right text-xs text-light-2 p-1 px-2 pr-3 pb-3 whitespace-nowrap"></th>
                </tr>
              </thead>

              <tbody class='space-y-2'>
                ${items.map(
									(item) =>
										html`<${ItemInputRow}
											key=${item.id}
											item=${item}
											onUpdate=${(field, value) =>
												updateItem(item.id, field, value)}
											onDelete=${() => deleteItem(item.id)} />`,
								)}
              </tbody>
            </table>

            <button onclick=${(e) => {
							e.preventDefault();
							addItem();
						}} class="bg-light-row w-full text-center py-2 rounded-full font-semibold text-light-2 cursor-pointer">+ Add New Item</button>
          </div>
				</form>
        <div class="flex justify-end gap-3 bg-light-bg sticky bottom-0 w-full py-6 px-14 ${
					shadow ? 'shadow-[2px_-10px_20px_rgba(0,0,0,0.2)]' : ''
				}">
          <${Button} className="mr-auto" variant="secondary" onclick=${closeForm}>Discard</${Button}>
          <${Button} variant="ghost" onclick=${() => saveInvoice('draft')}>
            Save as Draft
          </${Button}>
          <${Button} onclick=${() => saveInvoice()}>Save and Send</${Button}>
        </div>
			</section>
		</div>
	`;
}

function InvoiceDetail({
	invoice,
	onBack,
	deleteInvoice,
	invoiceStatus,
	markAsPaid,
	setOpenInvoiceForm,
}) {
	console.log(invoice);
	if (!invoice) return html`<div class="p-6">Invoice not found</div>`;
	const [openDeleteConfirmBtn, SetOpenDeleteConfirmBtn] = useState(false);

	const {
		id,
		createdAt,
		paymentDue,
		description,
		clientName,
		clientEmail,
		senderAddress,
		clientAddress,
		items,
		total,
	} = invoice;
	console.log(statusEl[invoiceStatus]());

	return html`
		<section class="grid grid-cols-6 grid-rows-[auto_1fr] gap-y-16 items-start">
			<div class="w-full col-span-4 col-start-2">
				<header
					class="flex flex-col items-center justify-between w-full gap-4 mx-auto mb-6">
					<${Button} variant="link" onClick=${onBack}>
						<img src="./assets/icon-arrow-left.svg" alt="Back" />
						<span class="pt-0.5 leading-tight">Go Back</span>
					</${Button}>

					<div class="bg-light-row flex w-full px-6 py-5 rounded-lg shadow-md">
						<div class="flex items-center gap-4">
							<p class="text-dark-1">Status</p>
							${statusEl[invoiceStatus]()}
						</div>

						<div class="flex gap-5 ml-auto">
							<${Button}
								variant="secondary"
								onClick=${() => setOpenInvoiceForm(true)}
                className="hover:opacity-70"
                >
								Edit
							</${Button}>
							<${Button}
								variant="danger"
								onClick=${() => SetOpenDeleteConfirmBtn((prev) => !prev)}
                className="hover:opacity-70"
                >
								Delete
							</${Button}>
							<${Button}
								variant="primary"
								onClick=${() => markAsPaid(id)}
                className="hover:opacity-70 ${
									invoiceStatus === 'paid'
										? 'opacity-70 cursor-not-allowed'
										: ''
								}"
                disabled=${invoiceStatus === 'paid'}
                >
								Mark as Paid
							</${Button}>
						</div>
					</div>
				</header>

				<section
					class="bg-light-row flex flex-col w-full gap-4 p-8 shadow-md rounded-lg">
					<div class="grid w-full grid-cols-2 mb-6">
						<div>
							<h2 class="text-light-primary text-xl font-semibold">
								<span class="text-light-2">#</span>${id}
							</h2>
							<p class="text-light-2 pt-1">${description}</p>
						</div>
						<div class="text-light-2 text-right">
							<p>${senderAddress.street}</p>
							<p>${senderAddress.city}</p>
							<p>${senderAddress.postCode}</p>
							<p>${senderAddress.country}</p>
						</div>
					</div>

					<div class="grid w-full grid-cols-3 gap-4 mb-6">
						<div class="flex flex-col gap-4 text-left">
							<div>
								<small class="text-light-2">Invoice Date</small>
								<p class="text-light-primary text-lg font-semibold">
									${dateTransformed(createdAt)}
								</p>
							</div>
							<div>
								<small class="text-light-2">Payment Due</small>
								<p class="text-light-primary text-lg font-semibold">
									${dateTransformed(paymentDue)}
								</p>
							</div>
						</div>

						<div>
							<small class="text-light-2">Bill to</small>
							<p class="text-light-primary text-lg font-semibold">
								${clientName}
							</p>
							<div class="text-light-2 text-left">
								<p>${clientAddress.street}</p>
								<p>${clientAddress.city}</p>
								<p>${clientAddress.postCode}</p>
								<p>${clientAddress.country}</p>
							</div>
						</div>

						<div>
							<small class="text-light-2">Sent to</small>
							<p class="text-light-primary text-lg font-semibold">
								${clientEmail}
							</p>
						</div>
					</div>

					<div class="bg-draft-secondary w-full overflow-hidden rounded-lg">
						<div class="p-8">
							<table class="w-full table-auto">
								<thead>
									<tr>
										<th class="text-light-2 px-4 py-2 text-sm text-left">
											Item Name
										</th>
										<th class="text-light-2 px-4 py-2 text-sm text-center">
											QTY.
										</th>
										<th class="text-light-2 px-4 py-2 text-sm text-center">
											Price
										</th>
										<th class="text-light-2 px-4 py-2 text-sm text-right">
											Total
										</th>
									</tr>
								</thead>
								<tbody class="text-light-primary">
									${items.map(
										(it) => html`
											<tr>
												<td class="px-4 py-2">${it.name}</td>
												<td class="px-4 py-2 text-center">${it.quantity}</td>
												<td class="px-4 py-2 text-center">${it.price}</td>
												<td class="px-4 py-2 text-right">${it.total}</td>
											</tr>
										`,
									)}
								</tbody>
							</table>
						</div>
						<div
							class="bg-dark-4 pb-7 grid items-center w-full grid-cols-2 p-8 text-white">
							<small class="text-sm leading-tight">Amount Due</small>
							<p class="text-2xl font-bold leading-tight text-right">
								$ ${total}
							</p>
						</div>
					</div>
				</section>
			</div>
		</section>

		<!-- Delete Confirmation Popup -->
		${
			openDeleteConfirmBtn
				? html`
					<div class="fixed top-0 left-0 right-0 bottom-0 ml-24">
            <div class="grid grid-cols-6 grid-rows-6 items-center w-full h-full">
              <div
                class="col-start-3 col-span-2 row-start-3 row-span-2 h-full w-full bg-light-row/40 z-10 backdrop-blur-lg shadow-lg rounded-lg border border-light-primary/10 p-10 flex flex-col gap-4">
                <h3 class="text-light-primary text-2xl font-semibold">
                  Confirm Deletion
                </h3>
                <p class="text-light-primary ">
                  Are you sure you want to delete invoice #${id}? This action cannot
                  be undone.
                </p>
                <div class='flex gap-4 ml-auto'>
                    <${Button}
                      variant="secondary"
                      onClick=${() => SetOpenDeleteConfirmBtn((prev) => !prev)}>
                      Cancel
                    </${Button}>
                    <${Button}
                      variant="danger"
                      onClick=${() => deleteInvoice(id)}>
                      Delete
                    </${Button}>
                </div>
              </div>
            </div>
          </div>
			  `
				: ''
		}
	`;
}

function App() {
	const [invoices, setInvoices] = useState(() =>
		JSON.parse(localStorage.getItem('invoices') || '[]'),
	);
	const [filters, setFilters] = useState([]);
	const [selectedInvoice, setSelectedInvoice] = useState(null);
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
	const [invoiceStatus, setInvoiceStatus] = useState(null);
	const [openInvoiceForm, setOpenInvoiceForm] = useState(false);

	useEffect(() => {
		if (invoices.length === 0) {
			(async () => {
				const res = await fetch('./data.json');
				const data = await res.json();
				setInvoices(data);
				localStorage.setItem('invoices', JSON.stringify(data));
			})();
		}
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
	const onFilterChange = (name, checked) =>
		setFilters((prev) =>
			checked ? [...prev, name] : prev.filter((p) => p !== name),
		);

	const filtered =
		filters.length > 0
			? invoices.filter((i) => filters.includes(i.status))
			: invoices;

	const openInvoice = (id) => {
		const invoice = invoices.find((i) => i.id === id);
		setSelectedInvoice(invoice);
		setInvoiceStatus(invoice.status);
	};
	const closeInvoice = () => setSelectedInvoice(null);

	const deleteInvoice = (id) => {
		setInvoices((prev) => prev.filter((i) => i.id !== id));
		localStorage.setItem(
			'invoices',
			JSON.stringify(invoices.filter((i) => i.id !== id)),
		);
		setSelectedInvoice(null);
	};

	const markAsPaid = (id) => {
		const updated = invoices.map((invoice) =>
			invoice.id === id ? { ...invoice, status: 'paid' } : invoice,
		);

		console.log(updated);

		localStorage.setItem('invoices', JSON.stringify(updated));
		setInvoices(updated);
		setInvoiceStatus('paid');
	};

	const addNewInvoice = (invoice) => {
		setInvoices((prev) => [...prev, invoice]);
		localStorage.setItem('invoices', JSON.stringify([...invoices, invoice]));
	};

	return html`
		<div class="flex h-full min-h-screen">
			<${Sidebar} theme=${theme} toggleTheme=${toggleTheme} />
			${openInvoiceForm
				? html`<${InvoiceForm}
						invoice=${selectedInvoice}
						setOpenInvoiceForm=${setOpenInvoiceForm}
						addNewInvoice=${addNewInvoice} />`
				: ''}
			<main class="w-full ml-24 p-6 transition-all duration-500 pt-18 relative">
				${selectedInvoice
					? html`<${InvoiceDetail}
							markAsPaid=${markAsPaid}
							invoiceStatus=${invoiceStatus}
							deleteInvoice=${deleteInvoice}
							invoice=${selectedInvoice}
							onBack=${closeInvoice}
							setOpenInvoiceForm=${setOpenInvoiceForm} />`
					: html`<${InvoiceList}
							setOpenInvoiceForm=${setOpenInvoiceForm}
							invoices=${filtered}
							allCount=${invoices.length}
							filters=${filters}
							onFilterChange=${onFilterChange}
							openInvoice=${openInvoice} />`}
			</main>
		</div>
	`;
}

render(html`<${App} />`, document.getElementById('app'));
