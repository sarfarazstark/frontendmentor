let tipSelected = false;
const customInputCheck = function (e) {
	const input = e.querySelector('input[type="radio"]');
	const customInput = e.querySelector('input[type="number"]');
	input.checked = true;

	customInput.addEventListener('input', function (e) {
		if (e.target.value >= 0) {
			input.dataset.value = customInput.value;
			tipSelected = true;
		}
	});
};

// -------------------Input--------------------
const billAmount = document.querySelector('input[name="bill"]');
const tipLabel = document.querySelectorAll('label.cursor-pointer');
const people = document.querySelector('input[name="people"]');
// -------------------Output--------------------
const outputTip = document.querySelector('#tip-output');
const perPersonOutput = document.querySelector('#per-person-output');

// calculating tip function
const calculateTipAndAmount = function (bill, tip, people) {
	// precise math ceil
	const tipAmount = parseFloat((bill * tip) / people);
	const perPerson = bill / people + tipAmount;
	return [tipAmount.toFixed(2), perPerson.toFixed(2)];
};

tipLabel.forEach((e) => {
	e.addEventListener('click', function (e) {
		tipSelected = true;
	});
});

// return parent sibling element
const errorParentSibling = function (e, order = 1) {
	const h3 = e.parentElement.previousElementSibling;
	if (order === 1) {
		h3.classList.add('text-red');
		h3.querySelector('img').classList.remove('hidden');
	} else {
		h3.classList.remove('text-red');
		h3.querySelector('img').classList.add('hidden');
	}
};
// check error
const checkError = function (bill, tip, people) {
	if (bill.value === '' || bill.value <= 0) {
		errorParentSibling(bill);
		return true;
	} else {
		errorParentSibling(bill, 0);
	}

	if (!tipSelected) {
		errorParentSibling(tipLabel[0]);
		return true;
	} else {
		errorParentSibling(tipLabel[0], 0);
	}

	if (people.value === '' || people.value <= 0) {
		errorParentSibling(people);
		return true;
	} else {
		errorParentSibling(people, 0);
	}
	return false;
};

document
	.querySelector('button[type="submit"]')
	.addEventListener('click', function (e) {
		e.preventDefault();
		if (checkError(billAmount, tipLabel, people)) return;
		const bill = parseFloat(billAmount.value);
		const tip =
			parseFloat(
				document.querySelector('input[type="radio"]:checked').dataset.value
			) / 100;
		const peopleCount = parseFloat(people.value);
		const [tipAmount, perPerson] = calculateTipAndAmount(
			bill,
			tip,
			peopleCount
		);
		outputTip.textContent = tipAmount;
		perPersonOutput.textContent = perPerson;
	});
