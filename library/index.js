if (localStorage.getItem('auth')) authorization();

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

//Добавление некоторых стилей для таб навигации во время прилипания
 window.addEventListener('scroll', () => { 
    const seasonList = document.querySelector('.season-list');
    window.scrollY >= 1739 && window.innerWidth <= 768 
    ? seasonList.classList.add('season-list--sticky') 
    : seasonList.classList.remove('season-list--sticky');
});

//Меню профиля
const profileBtn = document.querySelector('.profile-btn');
let profileMenu; 

if (localStorage.getItem('auth')) {
    profileMenu = document.querySelector('.with-auth');
    const title = document.querySelector('.title-number');
    title.textContent = localStorage.getItem('auth');
    title.style.fontSize = '12px';
} else {
    profileMenu = document.querySelector('.no-auth');
}

profileBtn.addEventListener('click', () => {
    if (burgerBtn.classList.contains('burger--active')) burger();
    profileMenu.classList.toggle('profile-menu--open');
});
document.body.addEventListener('click', (e) => {
    if (e.target.closest('.profile-menu') || e.target === profileBtn) return;
    profileMenu.classList.remove('profile-menu--open');
})

//Обработка кнопок логина и регистрации
const modalRegister = document.querySelector('.dark-modal--register');
const modalLogin = document.querySelector('.dark-modal--login');
const modalProfile = document.querySelector('.dark-modal--profile');

function addStyleDisplayToModal(modal) {
    if (profileMenu.classList.contains('profile-menu--open')) {
        profileMenu.classList.remove('profile-menu--open');
    }
    document.querySelectorAll('.dark-modal').forEach(block => block.style.display = '');
    modal.style.display = 'flex';
}

document.querySelectorAll('.register').forEach(btn => btn.addEventListener('click', () => {
    addStyleDisplayToModal(modalRegister);
}));

document.querySelectorAll('.login').forEach(btn => btn.addEventListener('click', () => {
    addStyleDisplayToModal(modalLogin);
}));

document.querySelectorAll('.btn-close').forEach(btn => btn.addEventListener('click', function() {
    cleanInputs();
    this.closest('.dark-modal').style.display = '';
}));

document.querySelectorAll('.modal-content').forEach(elem => elem.addEventListener('click', (e) => e._click = true));
document.querySelector('.profile-content').addEventListener('click', (e) => e._click = true);

document.querySelectorAll('.dark-modal').forEach(block => block.addEventListener('click', (e) => {
    if (e._click) return;
    cleanInputs();
    block.style.display = '';
}));

function cleanInputs() {
    document.querySelectorAll('.modal-input').forEach(input => input.value = '');
    document.querySelectorAll('.errors').forEach(div => div.textContent = '');
}

// Сбор и сохранение данных из полей регистрации
document.getElementById('reg').addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
        visits: 1,
        bonuses: 1240,
        books: 0,
        rentedBooks: [],
        cardNumber: null,
    };
    const errors = document.querySelector('.errors');

    for (const input of document.querySelector('.register-form')) {
        errors.textContent = '';
        if (!input.name) continue;
        if (!input.value.trim()) {
            errors.textContent = input.previousElementSibling.textContent + ' must not be empty';
            return;
        }
        if (input.name === 'email') {
           if (!input.value.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu)) {
            errors.textContent = 'Incorrect E-mail';
            return;
           }
        }
        if (input.name === 'password') {
            if (input.value.length < 8) {
                errors.textContent = 'Password must be at least 8 characters long';
                return;
            }
        }
        data[input.name] = input.value.trim();
    }
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    
    if (usersData.some(({email}) => email === data.email)) {
        errors.textContent = 'this email is already in use';
    } else {
        while (true) {
            const hexNumber = createCardNumber();
            if (usersData.some(({cardNumber}) => cardNumber === hexNumber)) continue;
            else {
                data.cardNumber = hexNumber;
                break;
            }
        }
        usersData.push(data);
        localStorage.setItem('users', JSON.stringify(usersData));
        localStorage.setItem('auth', data.cardNumber);
        modalRegister.style.display = '';
        location.reload();
    }
});

function createCardNumber() {
    let num;
    do {
      num = Math.floor(Math.random() * 0xfffffffff);
    } while (num < 0x100000000);
  
    return num.toString(16).toUpperCase();
}

// Сбор и обработка данных из полей логина
document.getElementById('login').addEventListener('click', (e) => {
    e.preventDefault();
    const errors = document.querySelector('.errors--login');
    const data = {};

    for (const input of document.querySelector('.login-form')) {
        errors.textContent = '';
        if (!input.name) continue;
        if (!input.value.trim()) {
            errors.textContent = input.previousElementSibling.textContent + ' must not be empty';
            return;
        }
        data[input.name] = input.value.trim();
    }

    const profiles = JSON.parse(localStorage.getItem('users')) || [];

    if (!profiles.some(user => user.email.toLowerCase() === data.email.toLowerCase() || user.cardNumber.toLowerCase() === data.email.toLowerCase())) {
        errors.textContent = 'User is not found';
        return;
    };

    const profile = profiles.find(user => user.email.toLowerCase() === data.email.toLowerCase() || user.cardNumber.toLowerCase() === data.email.toLowerCase());

    if (profile.password !== data.password) {
        errors.textContent = 'Incorrect password';
        return;
    }

    profile.visits += 1;
    localStorage.setItem('auth', profile.cardNumber);
    localStorage.setItem('users', JSON.stringify(profiles));
    modalLogin.style.display = '';
    location.reload();
})

//Авторизация пользователя
function authorization() {
    const profile = document.querySelector('.profile-btn');
    profile.textContent = '';
    profile.classList.add('profile-btn--auth');
    const profileInfo = JSON.parse(localStorage.getItem('users')).find(user => user.cardNumber === localStorage.getItem('auth'));
    profile.textContent = profileInfo.firstName[0].toUpperCase() + profileInfo.lastName[0].toUpperCase();
    profile.title = profileInfo.firstName[0].toUpperCase() + profileInfo.firstName.slice(1) + ' ' + profileInfo.lastName[0].toUpperCase() + profileInfo.lastName.slice(1);
    document.querySelector('.reader-card--unauth').style.display = 'none';
    document.querySelector('.reader-card--auth').style.display = 'flex';
    document.querySelector('.form-block-descr').textContent = 'Your Library card';
    const [name, number] = document.querySelectorAll('.input');
    name.value = profileInfo.firstName[0].toUpperCase() + profileInfo.firstName.slice(1) + ' ' + profileInfo.lastName[0].toUpperCase() + profileInfo.lastName.slice(1);
    number.value = profileInfo.cardNumber;
    name.disabled = true;
    number.disabled = true;
    document.querySelector('.form-btn').style.display = 'none';
    const form = document.querySelector('.form');
    form.style.padding = '17px';
    form.append(createUserInfoBlock(localStorage.getItem('auth')));
}

//Выход из учетной записи
document.querySelector('.log-out').addEventListener('click', () => {
    localStorage.removeItem('auth');
    location.reload();
})

//Создание блока с пользовательской информацией
function createUserInfoBlock(cardNumber, modal) {
    const list = document.createElement('ul');
    const data = ['Visits', 'Bonuses', 'Books'];

    for (let i = 0; i < 3; i++) {
        const li = document.createElement('li');
        const title = document.createElement('h4');
        const img = document.createElement('img');
        const span = document.createElement('span');
    
        list.classList.add('user-info');
        li.classList.add('user-info__item');
        title.classList.add('user-info__title');
        span.classList.add('user-info__count');

        if (modal) {
            li.style.gap = '10px';
            title.style.fontSize = '20px';
        }

        title.textContent = data[i];
        img.src = `assets/img/${data[i].toLocaleLowerCase()}.svg`;
        span.textContent = JSON.parse(localStorage.getItem('users')).find(user => user.cardNumber === cardNumber)[data[i].toLocaleLowerCase()];

        li.append(title, img, span);
        list.append(li);
    }
    return list;
}

//Check the card
document.querySelector('.form-btn').addEventListener('click', function(e) {
    e.preventDefault();
    if (this.previousElementSibling.classList.contains('errors')) {
        this.previousElementSibling.remove();
    }
    const fields = document.querySelectorAll('.input');
    for (const input of fields) {
        if (!input.value.trim()) {
            return createErrorBlock('Fields must not be empty', this);
        }
    }
    const profileInfo = JSON.parse(localStorage.getItem('users')).find(user => user.cardNumber === fields[1].value.trim());

    if (!profileInfo) {
        return createErrorBlock('Incorrect card number', this);
    }

    const name = fields[0].value.split(' ')[0].trim().toLowerCase();

    if (profileInfo.firstName.toLowerCase() === name || profileInfo.lastName.toLowerCase() === name) {
        this.style.display = 'none';
        const form = document.querySelector('.form');
        form.append(createUserInfoBlock(profileInfo.cardNumber));
        setTimeout(() => {
            form.lastElementChild.remove();
            document.querySelector('.form-btn').style.display = '';
            fields[0].value = '';
            fields[1].value = '';
        }, 10000);
    } else {
        return createErrorBlock('Incorrect name', this);
    }
});

function createErrorBlock(text, elem) {
    const div = document.createElement('div');
    div.classList.add('errors');
    div.textContent = text;
    elem.before(div);
} 

//Обработка кнопок Buy
const buyBtn = document.querySelectorAll('.buy');
if (!localStorage.getItem('auth')) {
    buyBtn.forEach(btn => btn.addEventListener('click', () => {
        addStyleDisplayToModal(modalLogin);
    }));
}

//Обработка кнопок для появления окна профиля
document.querySelectorAll('.my-profile').forEach(btn => btn.addEventListener('click', () => {
    addStyleDisplayToModal(modalProfile);
    if (document.querySelector('.main-info').children.length < 5) {
        document.querySelector('.main-info__title').after(createUserInfoBlock(localStorage.getItem('auth'), true));
        document.querySelector('.rented-books').after(createBooksList());
    } else {
        document.querySelector('.main-info > .user-info').replaceChildren(createUserInfoBlock(localStorage.getItem('auth'), true));
    }
    const profileInfo = JSON.parse(localStorage.getItem('users')).find(user => user.cardNumber === localStorage.getItem('auth'));
    document.querySelector('.initials').textContent = profileInfo.firstName[0].toUpperCase() + profileInfo.lastName[0].toUpperCase();
    document.querySelector('.user-full-name').textContent = profileInfo.firstName[0].toUpperCase() + profileInfo.firstName.slice(1) + ' ' + profileInfo.lastName[0].toUpperCase() + profileInfo.lastName.slice(1);
    document.getElementById('card-number').textContent = localStorage.getItem('auth');
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn.classList.contains('copy-btn--copied')) {
        copyBtn.classList.remove('copy-btn--copied');
    }
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(localStorage.getItem('auth'));
        this.classList.add('copy-btn--copied');
    })
}));

//Создание списка книг
function createBooksList() {
    const books = JSON.parse(localStorage.getItem('users')).find(user => user.cardNumber === localStorage.getItem('auth')).rentedBooks;
    if (!books.length) {
        const p = document.createElement('p');
        p.classList.add('list-empty');
        p.textContent = 'The list is empty';
        return p;
    }
    const list = document.createElement('ul');
    list.classList.add('books-list');

    for (const book of books) {
        const li = document.createElement('li');
        li.textContent = book;
        list.append(li);
    }
    return list;
}

console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3. На ширине экрана 768рх реализовано адаптивное меню +12\n\nРезультат: 50/50');
