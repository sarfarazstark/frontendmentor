// const fs = require('fs');

// fs.readdir('./', { withFileTypes: true }, (error, files) => {
//     if (error) throw error;
//     const directoriesInDIrectory = files
//         .filter((item) => item.isDirectory())
//         .map((item) => item.name);

//     console.log(directoriesInDIrectory);
// });

const directory = [
  '.git',
  '.vscode',
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
const btn = searchBar.appendChild(document.createElement('button'));
input.type = 'text';
input.placeholder = 'e.g Project';
btn.innerHTML = 'Search';
const li = main.appendChild(document.createElement('ul'));
directory.forEach((item) => {
  let name = '';
  if (!item[0].includes('.')) {
    const list = li.appendChild(document.createElement('li'));
    item.split('-').forEach((upperCase) => {
      name += `${upperCase[0].toUpperCase() + upperCase.slice(1)} `;
    })
    list.innerHTML = `${name} <a href='/${item}'>GO</a>`
  }
})