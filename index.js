const upperCaseEveryWord = (word) =>
	word
		.split('-')
		.filter((word) => word !== 'main' && word !== 'master')
		.map((word) => `${word[0].toUpperCase() + word.slice(1)}`)
		.join(' ');

const frontendmentor = (name, url) => {
	let newName = name
		.split('-')
		.filter((word) => word !== 'main' && word !== 'master')
		.join('-');
	newName = newName.replace(/(\d)-/, '$1');
	return newName + '-' + url;
};

const createListItemHTML = (item) => {
	const { name, tech } = item;
	const newName = upperCaseEveryWord(name);
	return `<li>
      <img src="/frontendmentor/${name}/design/desktop-preview.jpg" alt="${newName}">
      <div class="tech">
          ${tech
						.split('-')
						.map((name) => `<span class="${name}">${name}</span>`)
						.join(' ')}
      </div>
      <h3>${newName}</h3> 
      <div class="links">
          <a href='https://www.frontendmentor.io/challenges/${frontendmentor(
						name,
						item.fmpage
					)}'>Try out</a>
          <a href='/frontendmentor/${name}'>Live</a>
          <a href='https://github.com/sarfarazstark/frontendmentor/tree/main/${name}'>Repo</a>
      </div>
  </li>`;
};
const main = document.querySelector('main');
const li = main.appendChild(document.createElement('ul'));

fetch('./data.json')
	.then((response) => response.json())
	.then((data) => {
		data
			.sort((a, b) => new Date(a.submitDate) - new Date(b.submitDate))
			.forEach((item) => {
				if ('status' in item) return;
				console.log(item);
				li.insertAdjacentHTML('afterbegin', createListItemHTML(item));
			});
		document.querySelector('.total').textContent = data.length;
	});
