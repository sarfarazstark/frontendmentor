let menuOpen = false;
const menuBtn = document.getElementById('menu-btn');
const scrollLock = document.querySelector('body');
const nav = document.querySelector('nav');
const menuImg = menuBtn.getElementsByTagName('img')[0];
const navContent = document.querySelector('nav ul');
const navLinks = navContent.getElementsByTagName('a');
menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuOpen = true;
        // When we click on links menu should close
        for(let i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', () => {
                menuOpen = false;
                menuImg.src = 'assets/images/icon-menu.svg';
                scrollLock.style.overflow = 'auto';
                nav.style.display = 'none';
            })};
        menuImg.src = 'assets/images/icon-menu-close.svg';
        scrollLock.style.overflow = 'hidden';
        nav.style.display = 'flex';
    } else {
        menuOpen = false;
        menuImg.src = 'assets/images/icon-menu.svg';
        scrollLock.style.overflow = 'auto';
        nav.style.display = 'none';
    }
});