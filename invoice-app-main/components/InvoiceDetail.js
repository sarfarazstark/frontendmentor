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
}) {
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

	return html`
		<section class="grid grid-cols-1 grid-rows-[auto_1fr] gap-y-16 items-start px-6">
			<div class="w-full">
				<header
					class="flex flex-col items-center justify-between w-full gap-4 mx-auto mb-6">
					<${Button} variant="link" onClick=${onBack}>
						<img src="./assets/icon-arrow-left.svg" alt="Back" />
						<span class="pt-0.5 leading-tight">Go Back</span>
					</${Button}>

					<div class="bg-light-row w-full px-6 py-5 rounded-lg shadow-md">
						<div class="flex items-center justify-between w-full gap-4">
							<p class="text-dark-1">Status</p>
							${statusEl[invoiceStatus]()}
						</div>

						<div class="fixed bottom-0 left-0 right-0 bg-light-row flex justify-between p-4 gap-2">
							<${Button}
								variant="secondary"
								onClick=${() => setOpenInvoiceForm(true)}
                className="hover:opacity-70 mr-auto text-sm"
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
					class="bg-light-row flex flex-col w-full gap-4 p-4 shadow-md rounded-lg">
					<div class="grid w-full grid-cols-1 gap-y-4 mb-6">
						<div>
							<h2 class="text-light-primary text-xl font-semibold leading-tight">
								<span class="text-light-2 leading-tight">#</span>${id}
							</h2>
							<p class="text-light-3 text-sm">${description}</p>
						</div>
						<div class="text-light-3 text-left text-sm">
							<p>${senderAddress.street}</p>
							<p>${senderAddress.city}</p>
							<p>${senderAddress.postCode}</p>
							<p>${senderAddress.country}</p>
						</div>
					</div>

					<div class="grid w-full grid-cols-2 gap-4 mb-6">
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
						<div class="p-4 space-y-2">
							<table class="w-full table-auto hidden">
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
                ${items.map(
									(it) => html`
										<div class="grid grid-cols-[1fr_auto] gap-x-1 items-center">
											<div class="">
												<p
													class="text-light-primary font-semibold leading-tight">
													${it.name}
												</p>
												<span class="text-light-3 font-semibold text-sm">
													${it.quantity} x $ ${parseInt(it.price).toFixed(2)}
												</span>
											</div>
											<div
												class="text-right text-md text-light-primary font-semibold">
												$ ${parseInt(it.total).toFixed(2)}
											</div>
										</div>
									`,
								)}
						</div>
						<div
							class="bg-dark-4 pb-6 grid items-center w-full grid-cols-2 p-6 text-white">
							<small class="text-xs leading-tight inline-block">Amount Due</small>
							<p class="text-lg font-bold leading-tight text-right pt-1">
								 ${`$ ${parseInt(total).toFixed(1)}`}
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
				<div class="fixed top-0 left-0 right-0 bottom-0 mt-20 flex items-center p-4">
            <div class="grid grid-cols-1 items-center w-full h-auto">
              <div
                class=" h-full w-full bg-light-row/40 z-10 backdrop-blur-lg shadow-lg rounded-lg border border-light-primary/10 p-6 flex flex-col gap-4">
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

export default InvoiceDetail;
