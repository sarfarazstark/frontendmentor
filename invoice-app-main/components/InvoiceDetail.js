import { html } from 'https://esm.sh/htm/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import Button from './Button.js';
import { dateTransformed, statusEl, truncateString } from '../utils.js';

function InvoiceDetail({
	invoice,
	onBack,
	deleteInvoice,
	invoiceStatus,
	markAsPaid,
	setOpenInvoiceForm,
	SetOpenDeleteConfirmBtn,
}) {
	if (!invoice) return html`<div class="p-6">Invoice not found</div>`;

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

	return html`
		<section class="grid grid-cols-1 lg:grid-cols-8 grid-rows-[auto_1fr] sm:gap-y-1 items-start px-6 pb-14 sm:pb-0">
				<header
					class="flex flex-col items-center justify-between lg:col-start-3 lg:col-span-4 w-full gap-4 mx-auto mb-6">
					<${Button} variant="link" onClick=${onBack}>
						<img src="./assets/icon-arrow-left.svg" alt="Back" />
						<span class="pt-0.5 leading-tight">Go Back</span>
					</${Button}>

					<div class="bg-light-row w-full px-6 sm:px-8 py-5 rounded-lg shadow-md sm:flex sm:justify-between">
						<div class="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
							<p class="text-dark-1">Status</p>
							${statusEl[invoiceStatus]()}
						</div>

						<div class="fixed sm:flex-1 sm:static bottom-0 left-0 right-0 bg-light-row flex justify-between sm:justify-end p-4 sm:p-0 gap-2 sm:gap-4">
							<${Button}
								variant="secondary"
								onClick=${() => setOpenInvoiceForm(true)}
                className="hover:opacity-70 sm:mr-0 mr-auto text-sm"
                >
								Edit
							</${Button}>
							<${Button}
								variant="danger"
								onClick=${() => SetOpenDeleteConfirmBtn((prev) => !prev)}
                className="hover:opacity-70 text-sm"
                >
								Delete
							</${Button}>
							<${Button}
								variant="primary"
								onClick=${() => markAsPaid(id)}
                className="hover:opacity-70 text-sm ${
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
					class="bg-light-row flex flex-col lg:col-start-3 lg:col-span-4 w-full gap-4 p-4 sm:p-8 shadow-md rounded-lg">
					<div class="grid w-full grid-cols-1 sm:grid-cols-2 gap-y-4 mb-6">
						<div>
							<h2 class="text-light-primary text-xl font-semibold leading-tight">
								<span class="text-light-2 leading-tight">#</span>${id}
							</h2>
							<p class="text-light-3 text-sm">${description}</p>
						</div>
						<div class="text-light-3 text-left sm:text-right text-sm">
							<p>${senderAddress.street}</p>
							<p>${senderAddress.city}</p>
							<p>${senderAddress.postCode}</p>
							<p>${senderAddress.country}</p>
						</div>
					</div>

					<div class="grid w-full grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
						<div class="flex flex-col gap-4 text-left">
							<div>
								<small class="text-light-2">Invoice Date</small>
								<p class="text-light-primary text-md font-semibold">
									${dateTransformed(createdAt)}
								</p>
							</div>
							<div>
								<small class="text-light-2">Payment Due</small>
								<p class="text-light-primary text-md font-semibold">
									${dateTransformed(paymentDue)}
								</p>
							</div>
						</div>

						<div>
							<small class="text-light-2">Bill to</small>
							<p class="text-light-primary text-md font-semibold mt-3">
								${clientName}
							</p>
							<div class="text-light-2 text-left text-sm mt-2">
								<p>${clientAddress.street}</p>
								<p>${clientAddress.city}</p>
								<p>${clientAddress.postCode}</p>
								<p>${clientAddress.country}</p>
							</div>
						</div>

						<div>
							<small class="text-light-2">Sent to</small>
							<p class="text-light-primary text-md font-semibold mt-2">
								${clientEmail}
							</p>
						</div>
					</div>

					<div class="bg-draft-secondary w-full overflow-hidden rounded-lg">
						<div class="p-4 space-y-2 w-full">
              <table class="w-full table-auto hidden sm:table">
                <thead class="w-full">
                  <tr>
                    <th class="text-light-2 px-4 py-2 text-sm text-left">Item Name</th>
                    <th class="text-light-2 px-4 py-2 text-sm text-center">QTY.</th>
                    <th class="text-light-2 px-4 py-2 text-sm text-center">Price</th>
                    <th class="text-light-2 px-4 py-2 text-sm text-right">Total</th>
                  </tr>
                </thead>
                <tbody class="text-light-primary w-full">
                  ${items.map(
										(it) => html`
											<tr>
												<td class="px-4 py-2">${it.name}</td>
												<td class="px-4 py-2 text-center">${it.quantity}</td>
												<td class="px-4 py-2 text-center font-semibold">
													$ ${parseInt(it.price).toFixed(2)}
												</td>
												<td class="px-4 py-2 text-right font-semibold">
													$ ${parseInt(it.total).toFixed(2)}
												</td>
											</tr>
										`,
									)}
                </tbody>
              </table>
              <div class="flex flex-col gap-6 sm:hidden">
                ${items.map(
									(it) => html`
										<div class="grid grid-cols-[1fr_auto] gap-x-3 items-center">
											<div class="">
												<p
													class="text-light-primary text-sm font-semibold leading-tight">
													${it.name}
												</p>
												<span class="text-light-3 font-semibold text-xs">
													${it.quantity} x $ ${parseInt(it.price).toFixed(2)}
												</span>
											</div>
											<div
												class="text-right text-sm text-light-primary font-medium">
												$ ${parseInt(it.total).toFixed(2)}
											</div>
										</div>
									`,
								)}
              </div>
						</div>
						<div
							class="bg-dark-4 pb-6 grid items-center w-full grid-cols-2 p-6 text-white">
							<small class="text-xs leading-tight inline-block">Amount Due</small>
							<p class="text-md font-bold leading-tight text-right pt-1">
								 ${`$ ${parseInt(total).toFixed(1)}`}
							</p>
						</div>
					</div>
				</section>
		</section>
	`;
}

export default InvoiceDetail;
