import { html, render } from 'https://esm.sh/htm/preact';
import { useEffect, useState } from 'https://esm.sh/preact/hooks';
import Sidebar from './components/Sidebar.js';
import InvoiceList from './components/InvoiceList.js';
import InvoiceForm from './components/InvoiceForm.js';
import InvoiceDetail from './components/InvoiceDetail.js';

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

	// // for development auto select a invoice
	// useEffect(() => {
	// 	if (invoices.length > 0) {
	// 		openInvoice(invoices[0].id);
	// 	}
	// }, [invoices]);

	return html`
		<div class="flex h-full min-h-screen">
			<${Sidebar} theme=${theme} toggleTheme=${toggleTheme} />
			${openInvoiceForm
				? html`<${InvoiceForm}
						invoice=${selectedInvoice}
						setOpenInvoiceForm=${setOpenInvoiceForm}
						addNewInvoice=${addNewInvoice} />`
				: ''}
			<main
				class="w-full mt-20 lg:mt-0 lg:ml-20 p-6 px-0 transition-all duration-500 pt-12 relative">
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
