import { html, render } from 'https://esm.sh/htm/preact';
import { useEffect, useState } from 'https://esm.sh/preact/hooks';
import Sidebar from './components/Sidebar.js';
import InvoiceList from './components/InvoiceList.js';
import InvoiceForm from './components/InvoiceForm.js';
import InvoiceDetail from './components/InvoiceDetail.js';
import Button from './components/Button.js';

function App() {
	const [invoices, setInvoices] = useState(() =>
		JSON.parse(localStorage.getItem('invoices') || '[]'),
	);
	const [filters, setFilters] = useState([]);
	const [selectedInvoice, setSelectedInvoice] = useState(null);
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
	const [invoiceStatus, setInvoiceStatus] = useState(null);
	const [openInvoiceForm, setOpenInvoiceForm] = useState(false);
	const [openDeleteConfirmBtn, SetOpenDeleteConfirmBtn] = useState(false);

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
						addNewInvoice=${addNewInvoice}
						SetOpenDeleteConfirmBtn=${SetOpenDeleteConfirmBtn} />`
				: ''}
			<main
				class="w-full mt-20 lg:mt-0 lg:ml-20 p-6 px-0 transition-all duration-500 pt-12 relative">
				${selectedInvoice
					? html`<${InvoiceDetail}
							SetOpenDeleteConfirmBtn=${SetOpenDeleteConfirmBtn}
							markAsPaid=${markAsPaid}
							invoiceStatus=${invoiceStatus}
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
			<!-- Delete Confirmation Popup -->
			${openDeleteConfirmBtn
				? html`
                  <div class="fixed top-0 left-0 right-0 bottom-0 mt-20 lg:mt-0 lg:ml-20 flex items-center p-4 z-50">
                      <div class="grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-12 sm:grid-rows-[1fr_auto_1fr] sm:h-full items-center w-full h-auto">
                        <div
                          class="sm:col-start-3 lg:col-start-5 sm:col-span-4 lg:col-span-4 sm:row-start-2 h-full w-full bg-light-row/40 z-10 backdrop-blur-lg shadow-lg rounded-lg border border-light-primary/10 p-6 flex flex-col gap-4">
                          <h3 class="text-light-primary text-2xl font-semibold">
                            Confirm Deletion
                          </h3>
                          <p class="text-light-primary ">
                            Are you sure you want to delete invoice #${
															selectedInvoice.id
														}? This action cannot
                            be undone.
                          </p>
                          <div class='flex gap-4 ml-auto'>
                              <${Button}
                                variant="secondary"
                                onClick=${() =>
																	SetOpenDeleteConfirmBtn((prev) => !prev)}>
                                Cancel
                              </${Button}>
                              <${Button}
                                variant="danger"
                                onClick=${() =>
																	deleteInvoice(selectedInvoice.id)}>
                                Delete
                              </${Button}>
                          </div>
                        </div>
                      </div>
                    </div>
                `
				: ''}
		</div>
	`;
}

render(html`<${App} />`, document.getElementById('app'));
