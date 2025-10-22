import { html } from 'https://esm.sh/htm/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import Button from './Button.js';
import { dateTransformed, statusEl } from '../utils.js';

function InvoiceList({
	invoices,
	allCount,
	filters,
	onFilterChange,
	openInvoice,
	setOpenInvoiceForm,
}) {
	const [isFilterOpen, setIsFilterOpen] = useState(false); // Better as boolean

	return html`
		<section class="grid grid-cols-1 lg:grid-cols-8 grid-rows-[auto_1fr] gap-y-6 sm:gap-y-14 px-6 sm:px-8 items-start">
			<header
				class="gap-4 sm:gap-8 lg:col-start-3 lg:col-span-4 flex items-center justify-between w-full mx-auto">
				<div class="flex flex-col justify-center">
					<h1 class="text-light-primary text-xl sm:text-3xl font-bold leading-8">
						Invoices
					</h1>
					<small class="text-light-2 text-xs sm:hidden">
						${allCount} invoice${allCount > 1 ? 's' : ''}
					</small>
          <small class="text-light-2 text-sm hidden sm:block">
						There are ${allCount} total invoice${allCount > 1 ? 's' : ''}
					</small>
				</div>

				<div class="relative ml-auto">
					<label
						class="group text-light-primary flex items-center gap-2 cursor-pointer select-none"
						onClick=${() => setIsFilterOpen((prev) => !prev)}>
						<p class="sm:hidden font-semibold">Filter</p>
            <p class="hidden sm:block font-semibold">Filter by status</p>
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
														class="appearance-none w-4 h-4 border border-primary rounded-xs bg-light-1 checked:bg-[url('../assets/icon-check.svg')] checked:bg-center checked:bg-no-repeat checked:bg-primary checked:bg-size-[9px_9px]" />
													<label
														for=${name}
														class="capitalize font-semibold pt-0.5 text-md select-none">
														${name}
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
					<span class="p-1 w-8 sm:p-2 h-full bg-white rounded-full">
						<img src="./assets/icon-plus.svg" alt="Plus" class="w-full h-auto" />
					</span>
					<span class="leading-1 pt-1 text-sm sm:hidden">New</span>
          <span class="leading-1 mx-2 text-lg hidden sm:inline">New Invoice</span>
				</${Button}>
			</header>

				${
					allCount > 0
						? html`<section class="w-full h-full lg:col-start-3 lg:col-span-4 ">
								<ul
									class="w-full gap-1 sm:gap-4 grid grid-cols-[auto_1fr] sm:grid-cols-[auto__auto_1fr_auto_auto_auto]">
									${invoices.map(
										(invoice) => html`
											<li
												class="grid grid-cols-subgrid items-end sm:items-center justify-items-end sm:justify-items-center border border-transparent hover:border hover:border-primary cursor-pointer col-span-full bg-light-row justify-between shadow-md rounded-lg p-5 gap-2 sm:gap-6 select-none"
												onClick=${() => openInvoice(invoice.id)}>
												<div class="font-semibold text-light-primary">
													<span class="text-light-3">#</span>${invoice.id}
												</div>
												<div class="text-light-3 col-start-1 sm:col-start-2">
													<small>${dateTransformed(invoice.paymentDue)}</small>
												</div>
												<div
													class="text-light-3 row-start-1 col-start-2 sm:col-start-3 text-right sm:w-full sm:text-left">
													<small>${invoice.clientName}</small>
												</div>
												<div
													class="font-bold text-light-primary col-start-1 sm:col-start-4 text-left sm:text-right w-full">
													$ ${parseInt(invoice.total).toFixed(2)}
												</div>
												<div>${statusEl[invoice.status]()}</div>
												<div class="hidden sm:block">
													<img src="./assets/icon-arrow-right.svg" alt="View" />
												</div>
											</li>
										`,
									)}
								</ul>
						  </section>`
						: html`
								<section class="w-full lg:col-start-3 lg:col-span-4">
									<div
										class="w-60 flex flex-col items-center gap-4 mx-auto py-16">
										<img
											src="./assets/illustration-empty.svg"
											alt="No invoices" />
										<h2 class="text-light-primary mt-8 text-xl font-bold">
											There is nothing here
										</h2>
										<p class="text-light-primary text-sm leading-4 text-center">
											Create an invoice by clicking the<br />
											<strong>New Invoice</strong> button and get started
										</p>
									</div>
								</section>
						  `
				}
		</section>
	`;
}

export default InvoiceList;
