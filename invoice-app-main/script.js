'use strict';

const themeIcon = {
  "light": "./assets/icon-moon.svg",
  "dark": "./assets/icon-sun.svg",

}

const toggleTheme = (e) => {
  const img = e.querySelector("img");
  const currentTheme = e.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  console.log(newTheme);

  document.documentElement.setAttribute("data-theme", newTheme);
  e.dataset.theme = newTheme;
  img.src = themeIcon[newTheme];
};
