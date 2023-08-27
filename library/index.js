// Бургер
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

burgerBtn.addEventListener('click', burger);

burgerMenu.addEventListener('click', (e) => {
    e._click = true;
});

modal.addEventListener('click', (e) => {
    if (e._click) return;
    burger();
});

menuLinks.forEach(link => link.addEventListener('click', burger));

// Карусель
const sliderList = document.querySelector('.slider-list');
const paginationBtns = document.querySelectorAll('.pagination-btn');
const buttonArrow = document.querySelectorAll('.button-arrow');
let positionIndex = 0;

function changeSlidePosition(translateValue, elem) {
    sliderList.style.transform = `translateX(${translateValue}px)`;
    paginationBtns.forEach(btn => {
        btn.classList.remove('pagination-btn--active');
        btn.disabled = false;
    });
    elem.classList.add('pagination-btn--active');
    elem.disabled = true;
    positionIndex = [...paginationBtns].indexOf(elem);

    !positionIndex ? buttonArrow[0].disabled = true : buttonArrow[0].disabled = false;
    positionIndex > 3 ? buttonArrow[1].disabled = true : buttonArrow[1].disabled = false;
}

changeSlidePosition(0, paginationBtns[0]);

if (window.innerWidth > 768) {
    paginationBtns[0].addEventListener('click', () => {
        changeSlidePosition(0, paginationBtns[0]);
    });
    paginationBtns[3].addEventListener('click', () => {
        changeSlidePosition(-475, paginationBtns[3]);
    });
    paginationBtns[4].addEventListener('click', () => {
        changeSlidePosition(-950, paginationBtns[4]);
    });
} 

if (window.innerWidth <= 768) {
    let position = [0, -450, -900, -1350, -1800];

    paginationBtns.forEach((btn, i) => 
        btn.addEventListener('click', () => changeSlidePosition(position[i], btn)));

    buttonArrow[0].addEventListener('click', () => {
        if (!positionIndex) return;
        positionIndex--;
        changeSlidePosition(position[positionIndex], paginationBtns[positionIndex]);
    });

    buttonArrow[1].addEventListener('click', () => {
        if (positionIndex === 4) return;
        positionIndex++;
        changeSlidePosition(position[positionIndex], paginationBtns[positionIndex]);
    });
}

//Табы
const tabsBtn = document.querySelectorAll('.season-item');
const tabsItem = document.querySelectorAll('.favorites-list');
let path = 'one';

tabsItem.forEach(tab => tab.addEventListener('animationend', () => {
    tab.classList.remove('favorites-list--active', 'close');
    document.querySelector(`[data-target="${path}"]`).classList.add('favorites-list--active');
}));

tabsBtn.forEach(btn => btn.addEventListener('click', (e) => {
    if (path === e.currentTarget.dataset.path) return;
    path = e.currentTarget.dataset.path;
    document.querySelector('.favorites-list--active').classList.add('close');
}));

//Другое
document.querySelector('.form-btn').addEventListener('click', (e) => e.preventDefault());

console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3. На ширине экрана 768рх реализовано адаптивное меню +12\n\nРезультат: 50/50');
