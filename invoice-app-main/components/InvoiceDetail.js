import { html } from 'https://esm.sh/htm/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import Button from './Button.js';
import { dateTransformed, statusEl } from '../utils.js';

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
		<section class="grid grid-cols-6 md:grid-cols-10 grid-rows-[auto_1fr] gap-y-16 items-start">
			<div class="w-full col-span-4 md:col-span-8 col-start-2 md:col-start-2">
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
				<div class="fixed top-0 left-0 right-0 bottom-0 ml-24 md:ml-0 md:mt-16">
            <div class="grid grid-cols-6 md:grid-cols-10 grid-rows-6 md:grid-rows-[1fr_auto_1fr] items-center w-full h-full">
              <div
                class="col-start-3 md:col-span-6 md:col-start-3 col-span-2 row-start-3 md:row-start-2 row-span-2 md:row-span-1 h-full w-full bg-light-row/40 z-10 backdrop-blur-lg shadow-lg rounded-lg border border-light-primary/10 p-10 flex flex-col gap-4">
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
