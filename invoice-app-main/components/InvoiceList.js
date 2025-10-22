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
		<section class="grid grid-cols-6 grid-rows-[auto_1fr] gap-y-16 items-start">
			<header
				class="gap-14 flex items-center justify-between w-full col-span-4 col-start-2 mx-auto">
				<div class="flex flex-col justify-center gap-1">
					<h1 class="text-light-primary text-4xl font-bold leading-8">
						Invoices
					</h1>
					<small class="text-light-2">
						There are total ${allCount} invoices
					</small>
				</div>

				<div class="relative ml-auto">
					<label
						class="group text-light-primary flex items-center gap-2 cursor-pointer select-none"
						onClick=${() => setIsFilterOpen((prev) => !prev)}>
						Filter by status
						<img
							src="./assets/icon-arrow-down.svg"
							alt="arrow down"
							class=${`w-3 h-auto transition-all duration-300 ${
								isFilterOpen ? 'rotate-180' : ''
							}`} />
					</label>
					${isFilterOpen
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
													class="capitalize font-semibold pt-0.5 text-md select-none">
													${name}
												</label>
											</li>
										`,
									)}
								</ul>
							</span>`
						: ''}
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
				${allCount > 0
					? html`<section class="w-full col-span-4 col-start-2">
							<ul
								class="w-full gap-4 grid grid-cols-[auto_auto_1fr_auto_auto_auto]">
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
						</section>`
					: html`
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
					`}
			</section>
		</section>
	`;
}

export default InvoiceList;