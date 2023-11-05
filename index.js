// const fs = require('fs');

// fs.readdir('./', { withFileTypes: true }, (error, files) => {
//     if (error) throw error;
//     const directoriesInDIrectory = files
//         .filter((item) => item.isDirectory())
//         .map((item) => item.name);

//     console.log(directoriesInDIrectory);
// });

const directory = [
  '3-column-preview-card-component-main',
  'age-calculator-app-main',
  'article-preview-component-master',
  'base-apparel-coming-soon-master',
  'faq-accordion-card-main',
  'Food Card Component',
  'four-card-feature-section-master',
  'huddle-landing-page-with-single-introductory-section-master',
  'interactive-card-details-form-main',
  'interactive-rating-component-main',
  'intro-component-with-signup-form-master',
  'news-homepage',
  'newsletter-signup-form-with-success-message',
  'nft-preview-card-component-main',
  'notifications-page',
  'order-summary-component-main',
  'ping-coming-soon-page-master',
  'product-preview-card-component',
  'profile-card-component-main',
  'qr-code-component',
  'Responsive form',
  'results-summary-component-main',
  'single-price-grid-component-master',
  'social-proof-section-master',
  'stats-preview-card-component-main'
]
const main = document.body.appendChild(document.createElement('main'));
const searchBar = main.appendChild(document.createElement('div'));
const input = searchBar.appendChild(document.createElement('input'));
input.type = 'text';
input.placeholder = 'Search e.g Project';
let newData = [];
const li = main.appendChild(document.createElement('ul'));
directory.forEach((item) => {
  let name = '';
  const list = li.appendChild(document.createElement('li'));
  item.split('-').forEach((upperCase) => {
    name += `${upperCase[0].toUpperCase() + upperCase.slice(1)} `;
  })
  newData.push(name)
  list.innerHTML = `${name} <a href=/frontendmentor/${item}'>GO</a>`
})

input.addEventListener('input', () => {
  const searchValue = input.value.toLowerCase();

  // If the search input is empty, show the full list
  let filteredDirectory;
  if (!searchValue) {
    filteredDirectory = newData;
  } else {
    filteredDirectory = newData.filter(item => item.toLowerCase().includes(searchValue));
  }

  // Clear the current list
  while (li.firstChild) {
    li.removeChild(li.firstChild);
  }

  // Generate the new list
// Generate the new list
filteredDirectory.forEach((item) => {
  const list = li.appendChild(document.createElement('li'));
  // Highlight the matched text
  const regex = new RegExp(searchValue, 'gi');
  let name;
  if (searchValue) {
    name = item.replace(regex, (matched) => `<span class="highlight"> ${matched} </span>`);
  } else {
    name = item;
  }
  list.innerHTML = `${name} <a href='/frontendmentor/${item.trim().toLowerCase().replace(/\s+/g, "-")}'>GO</a>`
})

  // Set the input value back to the stored value
  input.value = searchValue;
})