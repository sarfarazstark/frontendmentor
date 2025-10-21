import { html, render } from 'https://esm.sh/htm/preact';
import { useEffect, useState } from 'https://esm.sh/preact/hooks';

/* -----------------------------------------------------------
   Helpers
----------------------------------------------------------- */
const dateTransformed = (date) =>
	new Date(date).toLocaleDateString('en-UK', {
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

/* -----------------------------------------------------------
   Component: Sidebar
----------------------------------------------------------- */
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
					class="h-1/2 bg-secondary rounded-tl-3xl absolute bottom-0 w-full"></span>
			</span>

			<span class="flex flex-col items-center gap-5 mt-auto">
				<button
					class="cursor-pointer hover:bg-dark-1 p-2 rounded-[10px] transition-colors duration-300"
					onClick=${toggleTheme}>
					<img src=${themeIcon[theme]} alt="Theme toggler" />
				</button>
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

/* -----------------------------------------------------------
   Component: InvoiceList
----------------------------------------------------------- */
function InvoiceList({
	invoices,
	allCount,
	filters,
	onFilterChange,
	openInvoice,
}) {
	return html`
		<section class="grid grid-cols-6 grid-rows-[auto_1fr] gap-y-16 items-start">
			<header
				class="gap-14 flex items-center justify-between w-full col-span-4 col-start-2w-full col-start-2 mx-auto">
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
						class="group text-light-primary flex items-center gap-2 cursor-pointer select-none">
						Filter by status
						<input type="checkbox" class="peer hidden" />
						<img
							src="./assets/icon-arrow-down.svg"
							alt="arrow down"
							class="peer-checked:rotate-180 w-3 h-auto transition-all duration-300" />
						<span
							class="peer-checked:inline-block bg-light-row w-44 -right-8 top-12 absolute hidden p-4 rounded-md shadow-md">
							<ul
								class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 items-center">
								${['draft', 'pending', 'paid'].map(
									(name) => html`
										<li
											class="grid-cols-subgrid col-span-full grid items-center">
											<input
												type="checkbox"
												name=${name}
												checked=${filters.includes(name)}
												onChange=${(e) =>
													onFilterChange(name, e.target.checked)}
												class="appearance-none w-4 h-4 border border-primary rounded-xs bg-light-1 checked:bg-[url('../assets/icon-check.svg')] checked:bg-center checked:bg-no-repeat checked:bg-primary checked:bg-[length:9px_9px]" />
											<label
												for=${name}
												class="capitalize font-semibold pt-0.5 text-md select-none"
												>${name}</label
											>
										</li>
									`,
								)}
							</ul>
						</span>
					</label>
				</div>

				<button
					class="bg-primary flex items-center gap-3 px-2 py-2 pr-5 text-white rounded-full">
					<span class="p-2 bg-white rounded-full">
						<img src="./assets/icon-plus.svg" alt="Plus" class="w-2.5 h-auto" />
					</span>
					<span class="leading-1 pt-1">New Invoice</span>
				</button>
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

/* -----------------------------------------------------------
   Component: InvoiceDetail
----------------------------------------------------------- */
function InvoiceDetail({ invoice, onBack }) {
	if (!invoice) return html`<div class="p-6">Invoice not found</div>`;

	const {
		id,
		createdAt,
		paymentDue,
		description,
		clientName,
		clientEmail,
		status,
		senderAddress,
		clientAddress,
		items,
		total,
	} = invoice;

	return html`
		<section class="grid grid-cols-6 grid-rows-[auto_1fr] gap-y-16 items-start">
			<div class="w-full col-span-4 col-start-2">
				<header
					class="flex flex-col items-center justify-between w-full gap-4 mx-auto mb-6">
					<button
						class="flex items-center justify-center gap-5 mr-auto cursor-pointer"
						onClick=${onBack}>
						<img src="./assets/icon-arrow-left.svg" alt="Back" />
						<p class="pt-0.5 leading-tight font-semibold text-dark-1">
							Go Back
						</p>
					</button>

					<div class="bg-light-row flex w-full px-6 py-5 rounded-lg shadow-md">
						<div class="flex items-center gap-4">
							<p class="text-dark-1">Status</p>
							${statusEl[status]()}
						</div>

						<div class="flex gap-5 ml-auto">
							<button
								class="px-5 font-semibold text-draft-primary py-3 pb-2.5 bg-draft-secondary rounded-full cursor-pointer"
								onClick=${() =>
									alert('Edit invoice feature not yet implemented')}>
								Edit
							</button>
							<button
								class="px-5 font-semibold text-white py-3 pb-2.5 bg-accent-red rounded-full cursor-pointer"
								onClick=${() =>
									alert('Delete invoice feature not yet implemented')}>
								Delete
							</button>
							<button
								class="px-5 font-semibold text-white py-3 pb-2.5 bg-primary rounded-full cursor-pointer"
								onClick=${() =>
									alert('Mark as Paid feature not yet implemented')}>
								Mark as Paid
							</button>
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
							<table class="w-full table-fixed">
								<thead>
									<tr>
										<th class="text-light-2 px-4 py-2 text-sm text-left">
											Item Name
										</th>
										<th class="text-light-2 px-4 py-2 text-sm text-left">
											QTY.
										</th>
										<th class="text-light-2 px-4 py-2 text-sm text-left">
											Price
										</th>
										<th class="text-light-2 px-4 py-2 text-sm text-left">
											Total
										</th>
									</tr>
								</thead>
								<tbody class="text-light-primary">
									${items.map(
										(it) => html`
											<tr>
												<td class="px-4 py-2">${it.name}</td>
												<td class="px-4 py-2">${it.quantity}</td>
												<td class="px-4 py-2">${it.price}</td>
												<td class="px-4 py-2">${it.total}</td>
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
	`;
}

/* -----------------------------------------------------------
   Component: App (Root)
----------------------------------------------------------- */
function App() {
	const [invoices, setInvoices] = useState(() =>
		JSON.parse(localStorage.getItem('invoices') || '[]'),
	);
	const [filters, setFilters] = useState([]);
	const [selectedId, setSelectedId] = useState(null);
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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

	const openInvoice = (id) => setSelectedId(id);
	const closeInvoice = () => setSelectedId(null);

	return html`
		<div class="flex h-full min-h-screen">
			<${Sidebar} theme=${theme} toggleTheme=${toggleTheme} />
			<main class="w-full ml-24 p-6 transition-all duration-500 pt-18">
				${selectedId
					? html`<${InvoiceDetail}
							invoice=${invoices.find((i) => i.id === selectedId)}
							onBack=${closeInvoice} />`
					: html`<${InvoiceList}
							invoices=${filtered}
							allCount=${invoices.length}
							filters=${filters}
							onFilterChange=${onFilterChange}
							openInvoice=${openInvoice} />`}
			</main>
		</div>
	`;
}

/* -----------------------------------------------------------
   Mount
----------------------------------------------------------- */
render(html`<${App} />`, document.getElementById('app'));
