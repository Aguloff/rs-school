console.log('Вроде всё соответствует заданию, 100/100');

const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.nav');
const menuLinks = document.querySelectorAll('.nav-link');

function burger() {
    burgerBtn.classList.toggle('burger--active');
    burgerMenu.classList.toggle('nav--active');
    document.body.classList.toggle('stop-scroll');
}

burgerBtn.addEventListener('click', () => burger());

menuLinks.forEach(link => link.addEventListener('click', () => burger()));
