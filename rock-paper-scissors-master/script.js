const choose = document.querySelector('#choose');
const chooseItem = choose.querySelectorAll('li.group');
const drawing = document.querySelector('#drawing');
const player = drawing.querySelector('#player');
const computer = drawing.querySelector('#computer');
const score = document.querySelector('#score');
const reset = document.querySelector('#reset');
score.textContent = localStorage.getItem('score') || 0;
score.textContent = score.textContent.padStart(2, '0');

const random = () => Math.floor(Math.random() * 3);

const displayToggle = function (element) {
	const elementNode = document.getElementById(element);
	elementNode.classList.toggle('hidden');
	elementNode.classList.toggle('flex');
};

const computerSelection = function (index) {
	// always trying to select element other than index element
	let randomIndex = random();
	while (randomIndex === +index) {
		randomIndex = random();
	}
	const item = chooseItem[randomIndex];
	// removing current li node from the computer container list
	computer.querySelector('li').classList.add('hidden');
	computer.insertAdjacentElement('beforeend', item.cloneNode(true));
};

const resetGame = function (element, action) {
	element
		.querySelector(':last-child')
		.classList.remove('shadow-rps-inner-shadow');
	element
		.querySelector(':last-child')
		.classList.add('shadow-rps-winner-shadow', 'animate-spread-shadow');

	score.textContent = action ? +score.textContent + 1 : +score.textContent - 1;
	score.textContent = score.textContent.padStart(2, '0');
	localStorage.setItem('score', score.textContent);

	if (!action) {
		reset.parentElement.querySelector('h2').textContent = 'You Lose';
		reset.classList.remove('text-rps-dark-text');
		reset.classList.add('text-rps-rock-gradient-start');
	} else {
		reset.parentElement.querySelector('h2').textContent = 'You win';
		reset.classList.add('text-rps-dark-text');
		reset.classList.remove('text-rps-rock-gradient-start');
	}
	reset.parentElement.classList.remove('hidden');
};

const checkWinner = function (player, computer) {
	const [playerBeat] = [player.querySelector('li').dataset.beat];
	const [computerIndex] = [computer.querySelector(':last-child').dataset.index];
	console.log(playerBeat, computerIndex);
	if (+playerBeat === +computerIndex) {
		console.log('player wins');
		resetGame(player, true);
	} else {
		resetGame(computer, false);
	}
};

const playerSelection = function (rpsContainer, toggleFn, playerContainer) {
	rpsContainer.addEventListener('click', (event) => {
		if (event.target.closest('li.group')) {
			const item = event.target.closest('li.group');
			playerContainer.insertAdjacentElement('beforeend', item.cloneNode(true));

			toggleFn('choose');
			toggleFn('drawing');

			setTimeout(() => {
				// passing the players choice index to the computerSelection function
				computerSelection(item.dataset.index);
				checkWinner(player, computer);
			}, 1000);
		}
	});
};

playerSelection(choose, displayToggle, player);

const resetFn = () => {
	displayToggle('drawing');
	displayToggle('choose');
	player.querySelector('li').remove();
	computer.querySelector(':last-child').remove();
	computer.querySelector('li').classList.remove('hidden');
	reset.parentElement.classList.add('hidden');
};

reset.addEventListener('click', resetFn);
