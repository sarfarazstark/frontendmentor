const itemContainer = document.querySelector('.items');
const cartContainer = document.querySelector('.cart-items');
const emptyState = document.querySelector('.empty-state');
const checkout = document.querySelector('.checkout');
const checkoutTotal = checkout.querySelector('strong');
const cartItemCounter = document.querySelector('.cart-item-count');
const incrDcr = document.querySelector('.inc-dcr');
const addToCart = document.querySelector('.add-to-cart');
const cartSection = document.querySelector('.cart');
// const dessertsNode = document.querySelectorAll('.dessert');
let dataContain = [];
let cartItems = [];
const desserts = [];

const renderItem = function (item) {
	const li = document.createElement('li');
	li.classList.add('hidden');
	li.dataset.thumbnail = item.image.thumbnail;
	li.classList.add('dessert');
	// li.setAttribute('data-category', item.category);
	const html = `
    <picture>
      <source media="(min-width: 1025px)" srcset="${item.image.desktop}">
      <source media="(max-width: 764px)" srcset="${item.image.tablet}">
      <source media="(max-width: 500px)" srcset="${item.image.mobile}">
      <img src="${item.image.desktop}" alt="${item.name} image">
    </picture>
    <div class="item-adder">
      <button class="add-to-cart"><img src="assets/images/icon-add-to-cart.svg" alt="">Add to
        Cart</button>
      <div class="inc-dcr" style="display: none;">
        <button><i class="fas fa-minus"></i></button>
        <span>1</span>
        <button><i class="fas fa-plus"></i></button>
      </div>
    </div>
    <br>
    <div class="info"> 
      <small>${item.category}</small>
      <p>${item.name}</p>
      <strong>$${item.price}</strong>
    </div>
`;
	li.innerHTML = html;
	desserts.push(li);
	return li;
};

// Append items to the container
const appendingItem = function (data) {
	return new Promise(() => {
		data.forEach((item) => {
			itemContainer.appendChild(renderItem(item));
		});
	});
};

// import json data
// Use Fetch API to load JSON data
fetch('data.json')
	.then((res) => {
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		return res.json();
	})
	.then((data) => {
		dataContain = data;
		appendingItem(data);
	})
	.then(() => {
		itemContainer.querySelectorAll('li').forEach((item) => {
			// console.log(item);
			item.querySelector('img').addEventListener('load', () => {
				item.classList.remove('hidden');
				item.classList.add('animation');
			});
		});
	});

let total = 0;
const renderCartItem = function (theList, object) {
	total += object.price;
	// console.log(theList, object);
	html = `
	      <div class="item">
	        <div>
	          <p>${object.name}</p>
	          <strong>
	            <span class='count-item'>x1</span>
	            <span class='item-amount'>@ $${object.price}</span>
	            <span class='counted-total'>$${object.price}</span>
	          </strong>
	        </div>
	        <button class="delete-item"><i class="fas fa-xmark"></i></button>
	      </div>
	      <hr>
	  `;
	const currLi = document.createElement('li');
	currLi.classList.add('animation');
	currLi.innerHTML = html;
	checkoutTotal.textContent = `$${total}`;
	cartContainer.appendChild(currLi);

	theList.querySelector('.add-to-cart').style.display = 'none';
	theList.querySelector('.inc-dcr').style.display = 'flex';
	theList.querySelector('img').classList.add('item-image-border');
	cartItems.push(currLi);
	cartItemCounter.innerHTML = cartItems.length;
};

const incrementOrDecrement = function (e, action) {
	const itemNode = e.target.closest('li');
	const buttonSpan = itemNode.querySelector('.inc-dcr').querySelector('span');
	const name = itemNode.querySelector('.info').querySelector('p').textContent;
	cartContainer.querySelectorAll('li').forEach((item) => {});
	const cartLi = cartItems.find((item) => {
		return item.querySelector('.item').querySelector('p').textContent === name;
	});

	const countedTotalPrice = cartLi.querySelector('.counted-total');
	const itemAmount = parseFloat(
		cartLi.querySelector('.item-amount').textContent.slice(3)
	);
	// console.log(itemAmount);
	const itemQuantity = cartLi.querySelector('.count-item');

	if (action === 'plus') {
		const buttonSpanValue = parseInt(buttonSpan.textContent) + 1;
		buttonSpan.textContent = buttonSpanValue; // update the quantity of the item

		itemQuantity.textContent = `x${buttonSpanValue}`; // update the quantity of the item in cart

		countedTotalPrice.textContent = `$${buttonSpanValue * itemAmount}`; // update the total price of the item into quantity in cart

		total += itemAmount;
		checkoutTotal.textContent = `$${total}`; // update the total price of the cart
	} else if (action === 'minus') {
		if (parseInt(buttonSpan.textContent) === 1) return 0;
		const buttonSpanValue = parseInt(buttonSpan.textContent) - 1;
		buttonSpan.textContent = buttonSpanValue; // update the quantity of the item

		itemQuantity.textContent = `x${buttonSpanValue}`; // update the quantity of the item in cart

		countedTotalPrice.textContent = `$${buttonSpanValue * itemAmount}`; // update the total price of the item into quantity in cart

		total -= itemAmount;
		checkoutTotal.textContent = `$${total}`; // update the total price of the cart
	}
};

//////////////////////////////////////////////
itemContainer.addEventListener('click', (e) => {
	if (e.target.classList.contains('fa-minus')) {
		incrementOrDecrement(e, 'minus');
		return 0;
	}
	if (e.target.classList.contains('fa-plus')) {
		incrementOrDecrement(e, 'plus');
		return 0;
	}
	if (e.target.classList.contains('add-to-cart')) {
		const itemNode = e.target.closest('li');
		const name = itemNode.querySelector('.info').querySelector('p').textContent;
		const item = dataContain.find((item) => item.name === name);
		// console.log(itemNode);

		// trying to reduce the repentance of the same work
		if (cartItems.length === 0) {
			cartContainer.classList.remove('none');
			emptyState.classList.add('none');
			checkout.classList.remove('none');
			renderCartItem(itemNode, item);
		} else {
			renderCartItem(itemNode, item);
		}
		return 0;
	}
});

// removing item from the cart
cartSection.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete-item')) {
		const itemNode = e.target.closest('li');
		const name = itemNode.querySelector('p').textContent;
		const totalItemValue = parseFloat(
			itemNode.querySelector('.counted-total').textContent.slice(1)
		);
		cartItemCounter.textContent = cartItems.length - 1;

		let relatedNode;
		desserts.forEach((node) => {
			if (node.querySelector('.info').querySelector('p').textContent === name) {
				relatedNode = node;
			}
		});

		total -= totalItemValue;
		checkoutTotal.textContent = `$${total}`;
		itemNode.remove();

		relatedNode.querySelector('.add-to-cart').style.display = 'flex';
		relatedNode.querySelector('.inc-dcr').style.display = 'none';
		relatedNode.querySelector('img').classList.remove('item-image-border');
		relatedNode.querySelector('.inc-dcr').querySelector('span').textContent = 1;

		if (checkoutTotal.textContent === '$0') {
			cartContainer.classList.add('none');
			emptyState.classList.remove('none');
			checkout.classList.add('none');
			cartItems = [];
			console.log(cartItems.length);
		}
	}
});
