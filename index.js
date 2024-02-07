// const fs = require('fs');

// fs.readdir('./', { withFileTypes: true }, (error, files) => {
//     if (error) throw error;
//     const directoriesInDIrectory = files
//         .filter((item) => item.isDirectory())
//         .map((item) => item.name);

//     console.log(directoriesInDIrectory);
// });

const directory = [
	{
		name: "3-column-preview-card-component-main",
		tech: "html-css",
		fmpage: "pH92eAR2-",
		submitDate: new Date("Nov 30, 2022"),
	},
	{
		name: "age-calculator-app-main",
		tech: "html-css-js",
		fmpage: "dF9DFFpj-Q",
		submitDate: new Date("Apr 14, 2023"),
	},
	{
		name: "article-preview-component-master",
		tech: "html-css",
		fmpage: "dYBN_pYFT",
		submitDate: new Date("Dec 11, 2022"),
	},
	{
		name: "base-apparel-coming-soon-master",
		tech: "html-css-js",
		fmpage: "5d46b47f8db8a7063f9331a0",
		submitDate: new Date("Dec 2, 2022"),
	},
	{
		name: "faq-accordion-card-main",
		tech: "html-css-js",
		fmpage: "XlyjD0Oam",
		submitDate: new Date("Dec 1, 2022"),
	},
	{
		name: "four-card-feature-section-master",
		tech: "html-css",
		fmpage: "weK1eFYK",
		submitDate: new Date("Dec 11, 2022"),
	},
	{
		name: "huddle-landing-page-with-single-introductory-section-master",
		tech: "html-css",
		fmpage: "B_2Wvxgi0",
		submitDate: new Date("Apr 10, 2023"),
	},
	{
		name: "interactive-card-details-form-main",
		tech: "html-css-js",
		fmpage: "XpS8cKZDWw",
		submitDate: new Date("Nov 3, 2023"),
	},
	{
		name: "interactive-rating-component-main",
		tech: "html-css-js",
		fmpage: "koxpeBUmI",
		submitDate: new Date("Sep 25, 2022"),
	},
	{
		name: "intro-component-with-signup-form-master",
		tech: "html-css-js",
		fmpage: "5cf91bd49edda32581d28fd1",
		submitDate: new Date("Dec 25, 2022"),
	},
	{
		name: "news-homepage",
		tech: "html-css",
		fmpage: "H6SWTa1MFl",
		submitDate: new Date("Nov 7, 2023"),
	},
	{
		name: "newsletter-signup-form-with-success-message",
		tech: "html-css-js",
		fmpage: "3FC1AZbNrv",
		submitDate: new Date("Oct 5, 2023"),
	},
	{
		name: "nft-preview-card-component-main",
		tech: "html-css",
		fmpage: "SbdUL_w0U",
		submitDate: new Date("Aug 5, 2022"),
	},
	{
		name: "notifications-page",
		tech: "html-css",
		fmpage: "DqK5QAmKbC",
		submitDate: new Date("Nov 1, 2023"),
	},
	{
		name: "order-summary-component-main",
		tech: "html-css",
		fmpage: "QlPmajDUj",
		submitDate: new Date("Sep 26, 2022"),
	},
	{
		name: "ping-coming-soon-page-master",
		tech: "html-css-js",
		fmpage: "5cadd051fec04111f7b848da",
		submitDate: new Date("Jan 5, 2023"),
	},
	{
		name: "product-preview-card-component",
		tech: "html-css-js",
		fmpage: "GO7UmttRfa",
		submitDate: new Date("Jul 29, 2022"),
	},
	{
		name: "profile-card-component-main",
		tech: "html-css",
		fmpage: "cfArpWshJ",
		submitDate: new Date("Sep 26, 2022"),
	},
	{
		name: "qr-code-component",
		tech: "html-css",
		fmpage: "iux_sIO_H",
		submitDate: new Date("Jul 25, 2022"),
	},
	{
		name: "results-summary-component-main",
		tech: "html-css-js",
		fmpage: "CE_K6s0maV",
		submitDate: new Date("Mar 28, 2023"),
	},
	{
		name: "single-price-grid-component-master",
		tech: "html-css",
		fmpage: "5ce41129d0ff452fec5abbbc",
		submitDate: new Date("Dec 25, 2022"),
	},
	{
		name: "social-proof-section-master",
		tech: "html-css",
		fmpage: "6e0qTv_bA",
		submitDate: new Date("Dec 9, 2022"),
	},
	{
		name: "stats-preview-card-component-main",
		tech: "html-css",
		fmpage: "8JqbgoU62",
		submitDate: new Date("Nov 26, 2022"),
	},
	// {
	// 	name: "sunnyside-agency-landing-page-main",
	// 	tech: "html-css",
	// 	fmpage: "7yVs3B6ef",
	// 	submitDate: "",
	// },
];
const upperCaseEveryWord = (word) =>
	word
		.split("-")
		.map((word) => `${word[0].toUpperCase() + word.slice(1)}`)
		.join(" ");

const frontendmentor = (name, url) => {
	let newName = name
		.split("-")
		.filter((word) => word !== "main" && word !== "master")
		.join("-");
	newName = newName.replace(/(\d)-/, "$1");
	return newName + "-" + url;
};

const main = document.querySelector("main");

const li = main.appendChild(document.createElement("ul"));
directory
	.sort((a, b) => a.submitDate - b.submitDate)
	.forEach((item) => {
		const { name, tech } = item;
		const newName = upperCaseEveryWord(name);
		li.insertAdjacentHTML(
			"afterbegin",
			`<li>
          <img src="/frontendmentor/${name}/design/desktop-preview.jpg" alt="${newName}">
          <div class="tech">
             ${tech
								.split("-")
								.map((name) => `<span>${name}</span>`)
								.join(" ")}
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
        </li>`
		);
	});
