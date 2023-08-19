const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.nav');
const menuLinks = document.querySelectorAll('.nav-link');
const modal = document.querySelector('.modal');

function burger() {
    burgerBtn.classList.toggle('burger--active');
    burgerMenu.classList.toggle('nav--active');
    document.body.classList.toggle('stop-scroll');
    modal.classList.toggle('modal--active');
}

burgerBtn.addEventListener('click', () => burger());

burgerMenu.addEventListener('click', (e) => {
    e._click = true;
});

modal.addEventListener('click', (e) => {
    if (e._click) return;
    burger();
});

menuLinks.forEach(link => link.addEventListener('click', () => burger()));

console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3. На ширине экрана 768рх реализовано адаптивное меню +12\n\nРезультат: 50/50');
