import { html } from 'https://esm.sh/htm/preact';
import { useEffect, useState, useRef } from 'https://esm.sh/preact/hooks';
import Button from './Button.js';

function InvoiceForm({
	invoice,
	setOpenInvoiceForm,
	addNewInvoice,
	SetOpenDeleteConfirmBtn,
}) {
	const {
		id = '',
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

	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [shadow, setShadow] = useState(true);
	const containerRef = useRef(null);

	const addItem = () => {
		setItems((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				name: '',
				quantity: '',
				price: '',
				total: '',
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

	const validateForm = () => {
		const newErrors = {};

		if (!sender.street.trim()) newErrors.senderStreet = "can't be empty";
		if (!sender.city.trim()) newErrors.senderCity = "can't be empty";
		if (!sender.postcode.trim()) newErrors.senderPostcode = "can't be empty";
		if (!sender.country.trim()) newErrors.senderCountry = "can't be empty";

		if (!client.name.trim()) newErrors.clientName = "can't be empty";
		if (!client.email.trim()) {
			newErrors.clientEmail = "can't be empty";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
			newErrors.clientEmail = 'invalid email';
		}
		if (!client.street.trim()) newErrors.clientStreet = "can't be empty";
		if (!client.city.trim()) newErrors.clientCity = "can't be empty";
		if (!client.postcode.trim()) newErrors.clientPostcode = "can't be empty";
		if (!client.country.trim()) newErrors.clientCountry = "can't be empty";

		if (!invoiceDetails.date) newErrors.invoiceDate = "can't be empty";
		if (!invoiceDetails.description.trim())
			newErrors.description = "can't be empty";

		if (items.length === 0) {
			newErrors.items = 'An item must be added';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
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
		setErrors({});
		setTouched({});
		setOpenInvoiceForm(false);
	};

	const saveInvoice = (status = 'pending') => {
		const allTouched = {
			senderStreet: true,
			senderCity: true,
			senderPostcode: true,
			senderCountry: true,
			clientName: true,
			clientEmail: true,
			clientStreet: true,
			clientCity: true,
			clientPostcode: true,
			clientCountry: true,
			invoiceDate: true,
			description: true,
		};
		setTouched(allTouched);

		if (!validateForm()) {
			return;
		}

		const createdAt = invoice ? invoice.createdAt : invoiceDetails.date;
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

	const handleBlur = (field) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
	};

	const showError = (field) => touched[field] && errors[field];

	return html`
    <div
      class="grid grid-cols-1 sm:grid-cols-10 gap-y-16 items-start fixed top-0 bottom-0 left-0 right-0 mt-20 lg:mt-0 lg:ml-20 z-10 bg-black/50">
      <section
        class="bg-light-bg overflow-y-scroll h-full transition-colors duration-100 sm:col-span-8 lg:col-span-5"
        ref=${containerRef}
        onScroll=${handleScroll}>
        <h2 class="text-2xl font-semibold text-light-primary mb-8 px-6 sm:px-10 pt-8">
          ${
						invoice
							? html`<h2
									class="text-light-primary text-xl font-semibold leading-tight">
									Edit <span class="text-light-2 leading-tight">#</span>${id}
							  </h2>`
							: 'New Invoice'
					}
        </h2>
        <form class="text-light-primary flex flex-col gap-3 p-6 pt-0 pb-6 sm:px-10">
          <!-- Sender Inputs -->
          <div>
            <small class="text-primary text-sm font-semibold">Bill From</small>
            <div class="flex flex-col space-y-1 my-6">
              <div class="flex justify-between items-center">
                <label htmlFor="street-address" class="text-xs text-light-2">Street Address</label>
                <span class="text-accent-red text-xs ${
									showError('senderStreet') ? 'visible' : 'invisible'
								}">${errors.senderStreet || 'Error'}</span>
              </div>
              <input
                type="text"
                name="street-address"
                id="street-address"
                autocomplete="street-address"
                value=${sender.street}
                onInput=${(e) => {
									setSender((prev) => ({ ...prev, street: e.target.value }));
								}}
                onBlur=${() => handleBlur('senderStreet')}
                class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
									showError('senderStreet')
										? 'border-accent-red'
										: 'border-light-primary/10'
								}" />
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-6">
              <div class="flex flex-col space-y-2">
                <div class="flex justify-between items-center">
                  <label htmlFor="city" class="text-xs text-light-2">City</label>
                  <span class="text-accent-red text-xs ${
										showError('senderCity') ? 'visible' : 'invisible'
									}">${errors.senderCity || 'Error'}</span>
                </div>
                <input
                  type="text"
                  name="city"
                  id="city"
                  autocomplete="address-level2"
                  value=${sender.city}
                  onInput=${(e) => {
										setSender((prev) => ({ ...prev, city: e.target.value }));
									}}
                  onBlur=${() => handleBlur('senderCity')}
                  class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
										showError('senderCity')
											? 'border-accent-red'
											: 'border-light-primary/10'
									}" />
              </div>
              <div class="flex flex-col space-y-2">
                <div class="flex justify-between items-center">
                  <label htmlFor="postcode" class="text-xs text-light-2">Post Code</label>
                  <span class="text-accent-red text-xs ${
										showError('senderPostcode') ? 'visible' : 'invisible'
									}">${errors.senderPostcode || 'Error'}</span>
                </div>
                <input
                  type="text"
                  name="postcode"
                  id="postcode"
                  autocomplete="postal-code"
                  value=${sender.postcode}
                  onInput=${(e) => {
										setSender((prev) => ({
											...prev,
											postcode: e.target.value,
										}));
									}}
                  onBlur=${() => handleBlur('senderPostcode')}
                  class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
										showError('senderPostcode')
											? 'border-accent-red'
											: 'border-light-primary/10'
									}" />
              </div>
              <div class="flex flex-col space-y-2 col-span-2 sm:col-span-1">
                <div class="flex justify-between items-center">
                  <label htmlFor="country" class="text-xs text-light-2">Country</label>
                  <span class="text-accent-red text-xs ${
										showError('senderCountry') ? 'visible' : 'invisible'
									}">${errors.senderCountry || 'Error'}</span>
                </div>
                <input
                  type="text"
                  name="country"
                  id="country"
                  autocomplete="country"
                  value=${sender.country}
                  onInput=${(e) => {
										setSender((prev) => ({ ...prev, country: e.target.value }));
									}}
                  onBlur=${() => handleBlur('senderCountry')}
                  class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
										showError('senderCountry')
											? 'border-accent-red'
											: 'border-light-primary/10'
									}" />
              </div>
            </div>
          </div>
          <!-- Receiver inputs -->
          <div>
            <small class="text-primary text-sm font-semibold">Bill To</small>
            <div class="flex flex-col space-y-2 my-6">
              <div class="flex justify-between items-center">
                <label htmlFor="name" class="text-xs text-light-2">Client Name</label>
                <span class="text-accent-red text-xs ${
									showError('clientName') ? 'visible' : 'invisible'
								}">${errors.clientName || 'Error'}</span>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                value=${client.name}
                onInput=${(e) => {
									setClient((prev) => ({ ...prev, name: e.target.value }));
								}}
                onBlur=${() => handleBlur('clientName')}
                class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
									showError('clientName')
										? 'border-accent-red'
										: 'border-light-primary/10'
								}" />
            </div>
            <div class="flex flex-col space-y-2 my-6">
              <div class="flex justify-between items-center">
                <label htmlFor="email" class="text-xs text-light-2">Client Email</label>
                <span class="text-accent-red text-xs ${
									showError('clientEmail') ? 'visible' : 'invisible'
								}">${errors.clientEmail || 'Error'}</span>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                value=${client.email}
                onInput=${(e) => {
									setClient((prev) => ({ ...prev, email: e.target.value }));
								}}
                onBlur=${() => handleBlur('clientEmail')}
                class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
									showError('clientEmail')
										? 'border-accent-red'
										: 'border-light-primary/10'
								}"
                placeholder="e.g. email@example.com" />
            </div>
            <div class="flex flex-col space-y-2 my-6">
              <div class="flex justify-between items-center">
                <label htmlFor="client-street-address" class="text-xs text-light-2">Street Address</label>
                <span class="text-accent-red text-xs ${
									showError('clientStreet') ? 'visible' : 'invisible'
								}">${errors.clientStreet || 'Error'}</span>
              </div>
              <input
                type="text"
                name="client-street-address"
                id="client-street-address"
                autocomplete="street-address"
                value=${client.street}
                onInput=${(e) => {
									setClient((prev) => ({ ...prev, street: e.target.value }));
								}}
                onBlur=${() => handleBlur('clientStreet')}
                class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
									showError('clientStreet')
										? 'border-accent-red'
										: 'border-light-primary/10'
								}" />
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-6">
              <div class="flex flex-col space-y-2">
                <div class="flex justify-between items-center">
                  <label htmlFor="client-city" class="text-xs text-light-2">City</label>
                  <span class="text-accent-red text-xs ${
										showError('clientCity') ? 'visible' : 'invisible'
									}">${errors.clientCity || 'Error'}</span>
                </div>
                <input
                  type="text"
                  name="client-city"
                  id="client-city"
                  autocomplete="address-level2"
                  value=${client.city}
                  onInput=${(e) => {
										setClient((prev) => ({ ...prev, city: e.target.value }));
									}}
                  onBlur=${() => handleBlur('clientCity')}
                  class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
										showError('clientCity')
											? 'border-accent-red'
											: 'border-light-primary/10'
									}" />
              </div>
              <div class="flex flex-col space-y-2">
                <div class="flex justify-between items-center">
                  <label htmlFor="client-postcode" class="text-xs text-light-2">Post Code</label>
                  <span class="text-accent-red text-xs ${
										showError('clientPostcode') ? 'visible' : 'invisible'
									}">${errors.clientPostcode || 'Error'}</span>
                </div>
                <input
                  type="text"
                  name="client-postcode"
                  id="client-postcode"
                  autocomplete="postal-code"
                  value=${client.postcode}
                  onInput=${(e) => {
										setClient((prev) => ({
											...prev,
											postcode: e.target.value,
										}));
									}}
                  onBlur=${() => handleBlur('clientPostcode')}
                  class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
										showError('clientPostcode')
											? 'border-accent-red'
											: 'border-light-primary/10'
									}" />
              </div>
              <div class="flex flex-col space-y-2 col-span-2 sm:col-span-1">
                <div class="flex justify-between items-center">
                  <label htmlFor="client-country" class="text-xs text-light-2">Country</label>
                  <span class="text-accent-red text-xs ${
										showError('clientCountry') ? 'visible' : 'invisible'
									}">${errors.clientCountry || 'Error'}</span>
                </div>
                <input
                  type="text"
                  name="client-country"
                  id="client-country"
                  autocomplete="country"
                  value=${client.country}
                  onInput=${(e) => {
										setClient((prev) => ({ ...prev, country: e.target.value }));
									}}
                  onBlur=${() => handleBlur('clientCountry')}
                  class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
										showError('clientCountry')
											? 'border-accent-red'
											: 'border-light-primary/10'
									}" />
              </div>
            </div>
          </div>
          <!-- Invoice Details -->
          <div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6">
              <div class="flex flex-col space-y-2">
                <div class="flex justify-between items-center">
                  <label htmlFor="date" class="text-xs text-light-2">Invoice Date</label>
                  <span class="text-accent-red text-xs ${
										showError('invoiceDate') ? 'visible' : 'invisible'
									}">${errors.invoiceDate || 'Error'}</span>
                </div>
                <input
                  type="date"
                  name="date"
                  id="date"
                  autocomplete="off"
                  value=${invoiceDetails.date}
                  onInput=${(e) => {
										setInvoiceDetails((prev) => ({
											...prev,
											date: e.target.value,
										}));
									}}
                  onBlur=${() => handleBlur('invoiceDate')}
                  class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border [color-scheme:light] dark:[color-scheme:dark]
                      dark:[&::-webkit-calendar-picker-indicator]:filter-invert dark:[&::-webkit-calendar-picker-indicator]:opacity-30 ${
												showError('invoiceDate')
													? 'border-accent-red'
													: 'border-light-primary/10'
											}"
                  placeholder=" " />
              </div>
              <div class="flex flex-col space-y-2">
                <label htmlFor="payment-due" class="text-xs text-light-2">Payment Due</label>
                <select
                  name="payment-due"
                  id="payment-due"
                  autocomplete="off"
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
              </div>
            </div>
            <div class="flex flex-col space-y-2 my-6">
              <div class="flex justify-between items-center">
                <label htmlFor="description" class="text-xs text-light-2">Project Description</label>
                <span class="text-accent-red text-xs ${
									showError('description') ? 'visible' : 'invisible'
								}">${errors.description || 'Error'}</span>
              </div>
              <input
                type="text"
                name="description"
                id="description"
                autocomplete="off"
                value=${invoiceDetails.description}
                onInput=${(e) => {
									setInvoiceDetails((prev) => ({
										...prev,
										description: e.target.value,
									}));
								}}
                onBlur=${() => handleBlur('description')}
                class="bg-light-row px-3 p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border ${
									showError('description')
										? 'border-accent-red'
										: 'border-light-primary/10'
								}"
                placeholder="e.g. Graphic Design Service" />
            </div>
          </div>
          <!-- Item List -->
          <div class='space-y-2'>
            <div class="flex justify-between items-center">
              <small class="text-light-2 text-xl font-semibold">Item List</small>
              ${
								errors.items
									? html`<p class="text-accent-red text-xs">${errors.items}</p>`
									: ''
							}
			    </div>
            <table class="w-full hidden sm:table mt-3 table-auto border-separate border-spacing-x-2 border-spacing-y-2">
                <thead>
                  <tr class="text-xs text-light-2 text-left">
                    <th class="font-medium w-[60%]">Item Name</th>
                    <th class="text-center w-[10%]">Qty.</th>
                    <th class="text-center w-[15%]">Price</th>
                    <th class="text-right w-[10%]">Total</th>
                    <th class="w-[5%]"></th>
                  </tr>
                </thead>

                <tbody class="text-light-primary">
                  ${items.map(
										(item) => html`
											<tr class="align-middle">
												<!-- Item Name -->
												<td class="py-2">
													<input
														type="text"
														name="description-${item.id}"
														autocomplete="off"
														value=${item.name}
														onInput=${(e) =>
															updateItem(item.id, 'name', e.target.value)}
														placeholder="e.g. OnePlus 12"
														class="bg-light-row px-3 py-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10 w-full" />
												</td>

												<!-- Qty -->
												<td class="py-2 text-center">
													<input
														type="number"
														min="0"
														value=${item.quantity}
														autocomplete="off"
														onInput=${(e) =>
															updateItem(item.id, 'quantity', e.target.value)}
														name="qty-${item.id}"
														class="bg-light-row px-2 py-2 rounded-md text-center focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10 w-16" />
												</td>

												<!-- Price -->
												<td class="py-2 text-center">
													<input
														type="number"
														min="0"
														step="0.01"
														value=${item.price}
														autocomplete="off"
														onInput=${(e) =>
															updateItem(item.id, 'price', e.target.value)}
														name="price-${item.id}"
														class="bg-light-row px-2 py-2 rounded-md text-center focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10 placeholder:text-light-2/70 placeholder:font-semibold w-20"
														placeholder="00" />
												</td>

												<!-- Total -->
												<td
													class="py-2 text-right text-sm text-light-2 font-semibold">
													${Number.isFinite(item.total)
														? item.total.toFixed(2)
														: '0.00'}
												</td>

												<!-- Delete -->
												<td class="py-2 text-right">
													<button
														type="button"
														onClick=${() => deleteItem(item.id)}
														class="hover:opacity-70 transition-opacity "
														title="Delete item">
														<img
															src="./assets/icon-delete.svg"
															alt="Delete"
															class="w-4 h-auto inline mb-1" />
													</button>
												</td>
											</tr>
										`,
									)}
                </tbody>
              </table>

              <div class="sm:hidden">
                  ${items.map(
										(item) =>
											html`<div
												class="w-fit grid grid-cols-1 grid-rows-2 col-span-full gap-x-2 gap-y-3">
												<div class="w-full col-span-full">
													<label
														class="text-left text-xs text-light-2"
														htmlFor="description-${item.id}"
														>Item Name</label
													>
													<input
														type="text"
														name="description-${item.id}"
														id="description-${item.id}"
														autocomplete="off"
														value=${item.name}
														onInput=${(e) =>
															updateItem(item.id, 'name', e.target.value)}
														placeholder="e.g. OnePlus 12"
														class="bg-light-row px-3 py-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10 w-full" />
												</div>
												<div
													class="w-full grid grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-x-2 items-end">
													<div class="text-center w-auto flex flex-col gap-2">
														<label
															class="text-left text-xs text-light-2"
															htmlFor="qty-${item.id}"
															>Quantity</label
														>
														<input
															type="text"
															value=${item.quantity}
															autocomplete="off"
															onInput=${(e) =>
																updateItem(item.id, 'quantity', e.target.value)}
															name="qty-${item.id}"
															id="qty-${item.id}"
															class="bg-light-row px-3 py-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10" />
													</div>

													<div class="flex flex-col gap-2">
														<label
															class="text-xs text-light-2"
															htmlFor="price-${item.id}"
															>Price</label
														>
														<input
															type="text"
															value=${item.price}
															autocomplete="off"
															onInput=${(e) =>
																updateItem(item.id, 'price', e.target.value)}
															name="price-${item.id}"
															id="price-${item.id}"
															class="bg-light-row p-2 rounded-md focus:ring focus:ring-primary focus:outline-0 border border-light-primary/10 placeholder:text-light-2/70 placeholder:font-semibold"
															placeholder="00" />
													</div>

													<div
														class="text-sm text-light-2 font-semibold flex flex-col gap-2">
														<label
															class="px-2 text-xs text-light-2"
															htmlFor="total-${item.id}"
															>Total</label
														>

														<input
															type="text"
															class="pl-2.5 py-2.5 focus:ring-transparent outline-none text-sm"
															readonly
															id="total-${item.id}"
															value=${Number.isFinite(item.total)
																? item.total.toFixed(2)
																: '0.00'} />
													</div>
													<div class="w-7 h-auto pb-3.5">
														<a onclick=${() => deleteItem(item.id)}>
															<img
																src="./assets/icon-delete.svg"
																alt="Delete btn" />
														</a>
													</div>
												</div>
											</div>`,
									)}
              </div>
            <button onclick=${(e) => {
							e.preventDefault();
							addItem();
						}} class="bg-light-row w-full text-center py-2 rounded-full font-semibold text-light-2 cursor-pointer mt-4">+ Add New Item</button>
          </div>
        </form>
        <div class="flex justify-end items-center gap-2 bg-light-bg sticky bottom-0 w-full p-4 sm:px-10 text-xs xs:text-sm sm:text- ${
					shadow ? 'shadow-[2px_-10px_20px_rgba(0,0,0,0.2)]' : ''
				}">
          <${Button} className="bg-draft-secondary/50 text-light-2 hover:bg-dark-4 px-6 py-2.5 xs:px-5 xs:py-3 mr-auto" variant="none" onclick=${closeForm}>Discard</${Button}>
          ${
						invoice
							? html`
              <${Button} variant="danger" onClick=${() =>
									SetOpenDeleteConfirmBtn(
										(prev) => !prev,
									)} className="hover:opacity-70 text-sm">
                  Delete
              </${Button}>`
							: html`
              <${Button} variant="none"
                        className="bg-draft-secondary text-draft-primary px-3 py-2.5 xs:px-5 xs:py-3 rounded-[10px]"
                      onclick=${() => saveInvoice('draft')}>
                      Save as Draft
              </${Button}>`
					}
          <${Button} variant="none"
          onclick=${() =>
						saveInvoice()} className="bg-primary px-3 py-2.5 xs:px-5 xs:py-3 hidden sm:block text-white">
              Save and Send
          </${Button}>
          <${Button} variant="none"
          onclick=${() =>
						saveInvoice()} className="bg-primary px-3 py-2.5 xs:px-5 xs:py-3 sm:hidden text-white">
              Save & Send
          </${Button}>
        </div>
      </section>
      <section class="col-span-2 h-full"
      onclick=${() => setOpenInvoiceForm(false)}></section>
    </div>
  `;
}

export default InvoiceForm;
