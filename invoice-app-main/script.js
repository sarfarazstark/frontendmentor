'use strict';
const data = [
	{
		id: 'RT3080',
		createdAt: '2021-08-18',
		paymentDue: '2021-08-19',
		description: 'Re-branding',
		paymentTerms: 1,
		clientName: 'Jensen Huang',
		clientEmail: 'jensenh@mail.com',
		status: 'paid',
		senderAddress: {
			street: '19 Union Terrace',
			city: 'London',
			postCode: 'E1 3EZ',
			country: 'United Kingdom',
		},
		clientAddress: {
			street: '106 Kendell Street',
			city: 'Sharrington',
			postCode: 'NR24 5WQ',
			country: 'United Kingdom',
		},
		items: [
			{
				name: 'Brand Guidelines',
				quantity: 1,
				price: 1800.9,
				total: 1800.9,
			},
		],
		total: 1800.9,
	},
	{
		id: 'XM9141',
		createdAt: '2021-08-21',
		paymentDue: '2021-09-20',
		description: 'Graphic Design',
		paymentTerms: 30,
		clientName: 'Alex Grim',
		clientEmail: 'alexgrim@mail.com',
		status: 'pending',
		senderAddress: {
			street: '19 Union Terrace',
			city: 'London',
			postCode: 'E1 3EZ',
			country: 'United Kingdom',
		},
		clientAddress: {
			street: '84 Church Way',
			city: 'Bradford',
			postCode: 'BD1 9PB',
			country: 'United Kingdom',
		},
		items: [
			{
				name: 'Banner Design',
				quantity: 1,
				price: 156.0,
				total: 156.0,
			},
			{
				name: 'Email Design',
				quantity: 2,
				price: 200.0,
				total: 400.0,
			},
		],
		total: 556.0,
	},
	{
		id: 'RG0314',
		createdAt: '2021-09-24',
		paymentDue: '2021-10-01',
		description: 'Website Redesign',
		paymentTerms: 7,
		clientName: 'John Morrison',
		clientEmail: 'jm@myco.com',
		status: 'paid',
		senderAddress: {
			street: '19 Union Terrace',
			city: 'London',
			postCode: 'E1 3EZ',
			country: 'United Kingdom',
		},
		clientAddress: {
			street: '79 Dover Road',
			city: 'Westhall',
			postCode: 'IP19 3PF',
			country: 'United Kingdom',
		},
		items: [
			{
				name: 'Website Redesign',
				quantity: 1,
				price: 14002.33,
				total: 14002.33,
			},
		],
		total: 14002.33,
	},
	{
		id: 'RT2080',
		createdAt: '2021-10-11',
		paymentDue: '2021-10-12',
		description: 'Logo Concept',
		paymentTerms: 1,
		clientName: 'Alysa Werner',
		clientEmail: 'alysa@email.co.uk',
		status: 'pending',
		senderAddress: {
			street: '19 Union Terrace',
			city: 'London',
			postCode: 'E1 3EZ',
			country: 'United Kingdom',
		},
		clientAddress: {
			street: '63 Warwick Road',
			city: 'Carlisle',
			postCode: 'CA20 2TG',
			country: 'United Kingdom',
		},
		items: [
			{
				name: 'Logo Sketches',
				quantity: 1,
				price: 102.04,
				total: 102.04,
			},
		],
		total: 102.04,
	},
	{
		id: 'AA1449',
		createdAt: '2021-10-7',
		paymentDue: '2021-10-14',
		description: 'Re-branding',
		paymentTerms: 7,
		clientName: 'Mellisa Clarke',
		clientEmail: 'mellisa.clarke@example.com',
		status: 'pending',
		senderAddress: {
			street: '19 Union Terrace',
			city: 'London',
			postCode: 'E1 3EZ',
			country: 'United Kingdom',
		},
		clientAddress: {
			street: '46 Abbey Row',
			city: 'Cambridge',
			postCode: 'CB5 6EG',
			country: 'United Kingdom',
		},
		items: [
			{
				name: 'New Logo',
				quantity: 1,
				price: 1532.33,
				total: 1532.33,
			},
			{
				name: 'Brand Guidelines',
				quantity: 1,
				price: 2500.0,
				total: 2500.0,
			},
		],
		total: 4032.33,
	},
	{
		id: 'TY9141',
		createdAt: '2021-10-01',
		paymentDue: '2021-10-31',
		description: 'Landing Page Design',
		paymentTerms: 30,
		clientName: 'Thomas Wayne',
		clientEmail: 'thomas@dc.com',
		status: 'pending',
		senderAddress: {
			street: '19 Union Terrace',
			city: 'London',
			postCode: 'E1 3EZ',
			country: 'United Kingdom',
		},
		clientAddress: {
			street: '3964  Queens Lane',
			city: 'Gotham',
			postCode: '60457',
			country: 'United States of America',
		},
		items: [
			{
				name: 'Web Design',
				quantity: 1,
				price: 6155.91,
				total: 6155.91,
			},
		],
		total: 6155.91,
	},
	{
		id: 'FV2353',
		createdAt: '2021-11-05',
		paymentDue: '2021-11-12',
		description: 'Logo Re-design',
		paymentTerms: 7,
		clientName: 'Anita Wainwright',
		clientEmail: '',
		status: 'draft',
		senderAddress: {
			street: '19 Union Terrace',
			city: 'London',
			postCode: 'E1 3EZ',
			country: 'United Kingdom',
		},
		clientAddress: {
			street: '',
			city: '',
			postCode: '',
			country: '',
		},
		items: [
			{
				name: 'Logo Re-design',
				quantity: 1,
				price: 3102.04,
				total: 3102.04,
			},
		],
		total: 3102.04,
	},
];

const themeBtn = document.querySelector('#theme-btn');

const themeIcon = {
	light: './assets/icon-moon.svg',
	dark: './assets/icon-sun.svg',
};

const toggleTheme = (e) => {
	const img = e.querySelector('img');
	const currentTheme = e.dataset.theme;
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

	console.log(newTheme);

	document.documentElement.setAttribute('data-theme', newTheme);
	e.dataset.theme = newTheme;
	img.src = themeIcon[newTheme];
	localStorage.setItem('theme', newTheme);
};

themeBtn.addEventListener('click', (e) => toggleTheme(e.currentTarget));

(() => {
	const theme = localStorage.getItem('theme');
	if (!theme) return;
	const img = themeBtn.querySelector('img');
	img.src = themeIcon[theme];
	themeBtn.dataset.theme = theme;
	document.documentElement.setAttribute('data-theme', theme);

	const invoices = localStorage.getItem('invoices');
	if (!invoices) {
		localStorage.setItem('invoices', JSON.stringify(data));
	}
})();

// Invoice
const emptyState = document.querySelector('#empty-state');
const invoiceList = document.querySelector('#invoice-list');
const invoiceCount = document.querySelector('#invoice-count');

const invoiceRowTemplate = (invoice) => {
	const { id, clientName, paymentDue, total, status } = invoice;

	const paymentDueTransformed = new Date(paymentDue).toLocaleDateString(
		'en-US',
		{
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		},
	);

	return `
		<li
			class="bg-light-row grid grid-cols-[auto_auto_1fr_auto_auto_auto] items-center shadow-md rounded-lg p-5 pb-4 gap-x-10">
			<div class="font-semibold text-light-primary">
				<span class="text-light-3">#</span>${id}
			</div>
			<div class="text-light-3"><small>${clientName}</small></div>
			<div class="text-light-3"><small>${paymentDueTransformed}</small></div>
			<div class="font-bold text-right text-light-primary">$ ${total}</div>
			<div
				class="flex items-center justify-center w-30 gap-2 px-4 py-3 pb-2.5 bg-${status}-secondary rounded-md">
				<span
					class="inline-block w-2 h-2 bg-${status}-primary rounded-full mb-0.5"></span
				><span
					class="inline-block leading-3 text-${status}-primary font-semibold capitalize"
					>${status}</span
				>
			</div>
			<div class="">
				<button>
					<img
						src="./assets/icon-arrow-right.svg"
						alt="View full details button" />
				</button>
			</div>
		</li>
	`;
};

if (data.length === 0) {
	emptyState.classList.remove('hidden');
	emptyState.classList.add('flex');
	invoiceCount.textContent = `No invoices`;
} else {
	invoiceCount.textContent = `There are total ${data.length} invoices`;
	data.forEach((invoice) => {
		const row = invoiceRowTemplate(invoice);
		invoiceList.insertAdjacentHTML('beforeend', row);
	});
}
