'use strict';
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('.search-input');
const userInfoContainer = document.querySelector('.user-info-section');
const elements = [
	userInfoContainer.querySelector('.avatar'),
	userInfoContainer.querySelector('.name'),
	userInfoContainer.querySelector('.username'),
	userInfoContainer.querySelector('.joined'),
	userInfoContainer.querySelector('.bio'),
	userInfoContainer.querySelector('.repos'),
	userInfoContainer.querySelector('.followers'),
	userInfoContainer.querySelector('.followings'),
	userInfoContainer.querySelector('.location'),
	userInfoContainer.querySelector('.website'),
	userInfoContainer.querySelector('.twitter'),
	userInfoContainer.querySelector('.company'),
];
0;

const blurringNotAvailableContent = function (array) {
	array.forEach((element) => {
		console.log(element);
		if (element.textContent === 'Not available') {
			element.classList.add('text-git-user-grayish-blue');
		} else {
			element.classList.remove('text-git-user-grayish-blue');
		}
	});
};

// rendering the user info
const renderUserInfo = function (json) {
	elements.forEach((element) => {
		if (element) {
			element.classList.add('animate-pulse');
		}
	});

	setTimeout(() => {
		elements.forEach((element) => {
			if (element) {
				element.classList.remove('animate-pulse');
			}
		});
		// entering all the data into the elements
		elements[0].src = json.avatar_url;
		elements[1].textContent = json.name || 'Not available'; // name
		elements[2].textContent = `@${json.login}`; // username

		//Joined 25 Jan 2011
		elements[3].textContent = `Joined ${new Date(
			json.created_at
		).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})}`;

		elements[4].textContent = json.bio || 'This profile has no bio';
		elements[5].textContent = json.public_repos;
		elements[6].textContent = json.followers;
		elements[7].textContent = json.following;
		elements[8].textContent = json.location || 'Not available';
		elements[9].textContent = json.blog || 'Not available';
		elements[10].textContent = json.twitter_username || 'Not available';
		elements[11].textContent = json.company || 'Not available';
		blurringNotAvailableContent(elements);
	}, 1000);

	console.log(json);
};
// getting the user and error handling
const search = async function (event) {
	if (searchInput.value === '') return alert('Input Field Empty');

	try {
		const response = await fetch(
			`https://api.github.com/users/${searchInput.value}`
		);
		if (!response.ok) throw new Error('User not found!');

		const responseJSON = await response.json();
		renderUserInfo(responseJSON);
	} catch (error) {
		alert(error);
	}
};

searchBtn.addEventListener('click', search);
searchInput.addEventListener('keydown', (e) => {
	if (e.type === 'keydown' && e.key === 'Enter') {
		search(e);
	}
});

const preloadedImg = new Image();
preloadedImg.src = 'assets/icon-moon.svg';

// Add event listener to the toggle button
document.getElementById('theme-toggle').addEventListener('click', (e) => {
	const toggler = e.target.parentElement;
	const html = document.querySelector('.theme');
	const span = toggler.querySelector('span');
	const img = toggler.querySelector('img');

	span.textContent = span.textContent === 'light' ? 'dark' : 'light';

	const imgSrc = img.getAttribute('src');
	const newImgSrc =
		imgSrc === 'assets/icon-sun.svg'
			? 'assets/icon-moon.svg'
			: 'assets/icon-sun.svg';

	// Apply initial rotation to 180 degrees
	img.style.transition = 'transform 0.5s';
	img.style.transform = 'rotate(180deg)';

	// Preload the new image
	const preloadedImg = new Image();
	preloadedImg.src = newImgSrc;
	preloadedImg.onload = () => {
		// Once the new image is loaded and rotation is complete, update the src attribute
		setTimeout(() => {
			img.src = newImgSrc;
			html.classList.toggle('dark');
			html.classList.toggle('light');
			// Reset the rotation back to 0 degrees
			img.style.transition = 'transform 0.5s';
			img.style.transform = 'rotate(0deg)';

			document
				.querySelector('.links')
				.querySelectorAll('li')
				.forEach((li) => {
					li.querySelector('img').src = li.querySelector('img').dataset.img;
					// removing light word from the cu
				});
		}, 500); // Match the timeout duration with the CSS transition duration
	};
});
