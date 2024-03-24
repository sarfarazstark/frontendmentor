import data from './data.json' assert { type: 'json' };

const chart = document.querySelector('.chart');
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const currentDay = days[new Date().getDay()];

// Function to create bar HTML
const createBarHTML = (item) => {
	return `<div class='bar-container'>
        <div class='bar'>
            <div class='bar__label'>${item.amount}</div>
            <div class='progress' data-size='${item.amount}' data-day='${item.day}'></div>
        </div>
        <p>${item.day}</p>
    </div>`;
};

// Function to handle mouseover event
const handleMouseOver = (event) => {
	const tooltip = event.target.previousElementSibling;
	tooltip.style.display = 'block';
};

// Function to handle mouseout event
const handleMouseOut = (event) => {
	const tooltip = event.target.previousElementSibling;
	tooltip.style.display = 'none';
};

// Insert bars into chart
data.forEach((item) => {
	const barHTML = createBarHTML(item);
	chart.insertAdjacentHTML('beforeend', barHTML);
});

// Select bars and apply styles
const bars = document.querySelectorAll('div[data-size]');
bars.forEach((bar) => {
	bar.style.height = `${Number(bar.dataset.size) * 2 - 10}%`;

	if (currentDay === bar.dataset.day) {
		bar.style.backgroundColor = 'hsl(186, 34%, 60%)';
	}

	bar.addEventListener('mouseover', handleMouseOver);
	bar.addEventListener('mouseout', handleMouseOut);
});
