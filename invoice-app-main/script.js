'use strict';
// Invoice
const emptyState = document.querySelector('#empty-state');
const invoiceContainer = document.querySelector('#invoice-list');
const invoiceCount = document.querySelector('#invoice-count');
const themeBtn = document.querySelector('#theme-btn');
const filtersInputs = document.querySelectorAll('#filters li');
const main = document.querySelector('#main-container');
const singleInvoiceContainer = document.querySelector('#invoice-container');

(async () => {
	const response = await fetch('./data.json');
	if (!response.ok) return;
	const data = await response.json();
	localStorage.setItem('invoices', JSON.stringify(data));
})();

const data = JSON.parse(localStorage.getItem('invoices') || '[]');
let chosenFilters = [];

const themeIcon = {
	light: './assets/icon-moon.svg',
	dark: './assets/icon-sun.svg',
};

const toggleTheme = (e) => {
	const img = e.querySelector('img');
	const currentTheme = e.dataset.theme;
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

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
})();

const statusEl = {
	paid: `
      <div class="flex items-center justify-center w-30 gap-2 px-4 py-3 pb-2.5 bg-paid-secondary rounded-md">
        <span class="inline-block w-2 h-2 bg-paid-primary rounded-full mb-0.5"></span><span
          class="inline-block leading-3 text-paid-primary font-semibold capitalize">paid</span>
      </div>`,
	pending: `
      <div class="flex items-center justify-center w-30 gap-2 px-4 py-3 pb-2.5 bg-pending-secondary rounded-md">
        <span class="inline-block w-2 h-2 bg-pending-primary rounded-full mb-0.5"></span><span
          class="inline-block leading-3 text-pending-primary font-semibold capitalize">pending</span>
      </div>`,
	draft: `
      <div class="flex items-center justify-center w-30 gap-2 px-4 py-3 pb-2.5 bg-draft-secondary rounded-md">
        <span class="inline-block w-2 h-2 bg-draft-primary rounded-full mb-0.5"></span><span
          class="inline-block leading-3 text-draft-primary font-semibold capitalize">draft</span>
      </div>`,
};

const dateTransformed = (date) => {
	return new Date(date).toLocaleDateString('en-UK', {
		year: 'numeric',
		day: 'numeric',
		month: 'short',
	});
};

const invoiceRowTemplate = (invoice) => {
	const { id, clientName, paymentDue, total, status } = invoice;

	const paymentDueTransformed = dateTransformed(paymentDue);

	return `
      <li data-id="${id}" class="grid grid-cols-subgrid border border-transparent hover:border hover:border-primary cursor-pointer col-span-full bg-light-row items-center shadow-md rounded-lg p-5 gap-x-10 select-none">
        <div class="font-semibold text-light-primary">
          <span class="text-light-3">#</span>${id}
        </div>
        <div class="text-light-3"><small>${paymentDueTransformed}</small></div>
        <div class="text-light-3"><small>${clientName}</small></div>
        <div class="font-bold text-right text-light-primary">$ ${total}</div>
        ${statusEl[status]}
        <div class="">
          <button class="cursor-pointer" >
            <img
              src="./assets/icon-arrow-right.svg"
              alt="View full details button" />
          </button>
        </div>
      </li>
	`;
};

const renderInvoices = (data, filter = []) => {
	invoiceContainer.innerHTML = '';
	const filteredData =
		filter.length > 0
			? data.filter((invoice) => filter.includes(invoice.status))
			: data;

	filteredData.forEach((invoice) => {
		const row = invoiceRowTemplate(invoice);
		invoiceContainer.insertAdjacentHTML('beforeend', row);
	});
};

if (data.length === 0) {
	emptyState.classList.replace('hidden', 'flex');
	invoiceCount.textContent = `No invoices`;
} else {
	invoiceCount.textContent = `There are total ${data.length} invoices`;
	renderInvoices(data);
}

filtersInputs.forEach((filterInput) => {
	filterInput.addEventListener('change', () => {
		const filtersArray = Array.from(filtersInputs);

		chosenFilters = filtersArray.map((filter) => {
			const checkbox = filter.querySelector('input');

			return checkbox.checked ? checkbox.name : null;
		});

		// Removing null values
		chosenFilters = chosenFilters.filter((filter) => filter !== null);

		renderInvoices(data, chosenFilters);
	});
});

const invoices = invoiceContainer.querySelectorAll('li');

const renderInvoice = (invoiceId) => {
	const {
		id,
		createdAt,
		paymentDue,
		description,
		paymentTerm,
		clientName,
		clientEmail,
		status,
		senderAddress,
		clientAddress,
		items,
		total,
	} = Object.values(data).filter((i) => {
		return i.id === invoiceId;
	})[0];

	return `
	  <header class="flex flex-col items-center justify-between w-full col-span-4 col-start-2 gap-4 mx-auto">
        <button id="back-btn" class='flex items-center justify-center gap-5 mr-auto cursor-pointer'>
          <img src="./assets/icon-arrow-left.svg" alt="Back to home screen icon">
          <p class="pt-0.5 leading-tight font-semibold text-dark-1">Go Back</p>
        </button>
        <div class="bg-light-row flex w-full px-6 py-5 rounded-lg shadow-md">
          <div class='flex items-center gap-4'>
            <p class='text-dark-1'>Status</p>
            ${statusEl[status]}
          </div>

          <div class='flex gap-5 ml-auto'>
            <button
              class='px-5 font-semibold text-draft-primary py-3 pb-2.5 bg-draft-secondary rounded-full cursor-pointer' data-invoice-id='${id}' >Edit</button>
            <button class='px-5 font-semibold text-white py-3 pb-2.5 bg-accent-red rounded-full cursor-pointer' data-invoice-id='${id}' >Delete</button>
            <button class='px-5 font-semibold text-white py-3 pb-2.5 bg-primary rounded-full cursor-pointer' data-invoice-id='${id}' >Mark as Paid</button>
          </div>
        </div>
      </header>

      <section
        class="bg-light-row flex flex-col items-center justify-between w-full col-span-4 col-start-2 gap-4 p-16 shadow-md rounded-lg">
        <!-- 2 columns -->
        <div class='grid w-full grid-cols-2'>
          <div>
            <h2 class='text-light-primary text-xl font-semibold'><span class='text-light-2'>#</span>${id}</h2>
            <p class='text-light-2 pt-1'>${description}</p>
          </div>
          <div class='text-light-2 text-right'>
            <p>${senderAddress.street}</p>
            <p>${senderAddress.city}</p>
            <p>${senderAddress.postCode}</p>
            <p>${senderAddress.country}</p>
          </div>
        </div>
        <!-- 3 columns -->
        <div class='grid w-full grid-cols-3'>
          <!-- First Column -->
          <div class='flex flex-col gap-4 text-left'>
            <div>
              <small class='text-light-2 '>Invoice Date</small>
              <p class='text-light-primary text-lg font-semibold'>${dateTransformed(
								createdAt,
							)}</p>
            </div>
            <div>
              <small class='text-light-2 '>Payment Due</small>
              <p class='text-light-primary text-lg font-semibold'>${dateTransformed(
								paymentDue,
							)}</p>
            </div>
          </div>
          <!-- Second Column -->
          <div>
            <small class='text-light-2'>Bill to</small>
            <p class='text-light-primary text-lg font-semibold'>${clientName}</p>
            <div class='text-light-2 text-left'>
            <p>${clientAddress.street}</p>
            <p>${clientAddress.city}</p>
            <p>${clientAddress.postCode}</p>
            <p>${clientAddress.country}</p>
            </div>
          </div>
          <!-- Third Column-->
          <div>
            <small class='text-light-2'>Sent to</small>
            <p class='text-light-primary text-lg font-semibold'>${clientEmail}</p>
          </div>
        </div>

        <!--  -->
        <div class="bg-draft-secondary w-full overflow-hidden rounded-lg shadow-md">
          <div class='p-8'>
            <table class="w-full table-fixed">
              <thead class=" text-white">
                <tr>
                  <th class="text-light-2 px-4 py-2 text-sm text-left">Item Name</th>
                  <th class="text-light-2 px-4 py-2 text-sm text-left">QTY.</th>
                  <th class="text-light-2 px-4 py-2 text-sm text-left">Price</th>
                  <th class="text-light-2 px-4 py-2 text-sm text-left">Total</th>
                </tr>
              </thead>
              <tbody class="text-light-primary">
                ${items.map(
									({ name, quantity, price, total }) =>
										`<tr class=''>
										<td class='px-4 py-2'>${name}</td>
										<td class='px-4 py-2'>${quantity}</td>
										<td class='px-4 py-2'>${price}</td>
										<td class='px-4 py-2'>${total}</td>
									</tr>`,
								)}
              </tbody>
            </table>
          </div>
          <div class='bg-dark-4 pb-7 grid items-center w-full grid-cols-2 p-8 text-white'>
            <small class='text-sm leading-tight'>Amount Due</small>
            <p class='text-2xl font-bold leading-tight text-right'>$ ${total}</p>
          </div>
        </div>
      </section>`;
};

const toggleScreen = () => {
	if (singleInvoiceContainer.classList.contains('hidden')) {
		singleInvoiceContainer.classList.replace('hidden', 'grid');
		main.classList.replace('grid', 'hidden');
	} else {
		singleInvoiceContainer.classList.replace('grid', 'hidden');
		main.classList.replace('hidden', 'grid');
	}
	// Scroll to top
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};

invoices.forEach((invoice) => {
	invoice.addEventListener('click', (e) => {
		const id = e.currentTarget.dataset.id;
		singleInvoiceContainer.innerHTML = renderInvoice(id);
		document.getElementById('back-btn').addEventListener('click', toggleScreen);
		toggleScreen();
	});
});
