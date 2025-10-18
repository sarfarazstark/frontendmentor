function getPathWithoutFile() {
  const path = window.location.pathname;
  const segments = path.split('/');
  const lastSegment = segments[segments.length - 1];

  if (lastSegment.includes('.')) {
    segments.pop();
  }

  return segments.join('/') || '/';
}

const pathname = getPathWithoutFile();

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

  return `
   <li>
    <div class="image-container">
      <a href="${pathname}${name}">
        <div class="image-placeholder">
          <span class="placeholder-content">Loading...</span>
        </div>
        <img
          src="${pathname}${name}/design/desktop-preview.jpg"
          alt="${newName}"
          loading="lazy"
          width="375"
          height="180"
          onload="this.classList.add('loaded'); this.previousElementSibling.style.opacity='0';"
          onerror="this.classList.add('error'); this.previousElementSibling.innerHTML='<span class=\\'placeholder-content\\'>Failed to load</span>';"
        />
       </a>
    </div>
    <div class="tech">
      ${tech
      .split('-')
      .map((name) => `<span class="${name}">${name}</span>`)
      .join(' ')}
    </div>
    <h3>${newName}</h3>
    <div class="links">
      <a
        class="link"
        href="https://www.frontendmentor.io/challenges/${frontendmentor(
        name,
        item.fmpage
      )}"
        ><span>Challenge</span></a>
      <a class="link" href="${pathname}${name}"
        ><span>Live</span></a>
      <a
        class="link"
        href="https://github.com/sarfarazstark/frontendmentor/tree/main/${name}"
        ><span>Repo</span></a>
    </div>
  </li>
`;
};

const main = document.querySelector('main');
const li = main.appendChild(document.createElement('ul'));

fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    data.sort((a, b) => new Date(a.submitDate) - new Date(b.submitDate));
    for (const item of data) {
      if ('status' in item) continue;
      // console.log(item);
      li.insertAdjacentHTML('afterbegin', createListItemHTML(item));
    }
    document.querySelector('.total').textContent = data.length;
  });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("Service Worker registered ✅", reg.scope))
      .catch((err) => console.error("Service Worker registration failed ❌", err));
  });
}
