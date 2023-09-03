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
const modalBuyCard = document.querySelector('.dark-modal--buy');

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
document.querySelector('.buy-content').addEventListener('click', (e) => e._click = true);

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
    for (const btn of document.querySelectorAll('.buy')) {
        disabledButtonBook(btn);
    }
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

        if (i === 2 && !modal) {
            span.id = 'count';
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
    const profiles = JSON.parse(localStorage.getItem('users')) || [{cardNumber: null, name: null}];
    const profileInfo = profiles.find(user => user.cardNumber === fields[1].value.trim());

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
} else if (!JSON.parse(localStorage.getItem('users')).find(user => user.cardNumber === localStorage.getItem('auth')).card) {
    buyBtn.forEach(btn => btn.addEventListener('click', () => {
        addStyleDisplayToModal(modalBuyCard);
    }));
} else {
    buyBtn.forEach(btn => btn.addEventListener('click', buyBook));
}

//Обработка кнопок для появления окна профиля
document.querySelectorAll('.my-profile').forEach(btn => btn.addEventListener('click', () => {
    addStyleDisplayToModal(modalProfile);
    if (document.querySelector('.main-info').children.length < 5) {
        document.querySelector('.main-info__title').after(createUserInfoBlock(localStorage.getItem('auth'), true));
        document.querySelector('.rented-books').after(createBooksList());
    } else {
        document.querySelector('.main-info > .user-info').replaceChildren(createUserInfoBlock(localStorage.getItem('auth'), true));
        document.querySelector('.rented-books').nextElementSibling.remove();
        document.querySelector('.rented-books').after(createBooksList());
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
        p.textContent = 'You don\'t have books';
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

//Покупка книги
function buyBook() {
    this.disabled = true;
    this.textContent = 'Own';
    this.classList.add('buy--own');
    const countBooks = document.getElementById('count');
    countBooks.textContent = +countBooks.textContent + 1;
    const profiles = JSON.parse(localStorage.getItem('users'));
    const profileInfo = profiles.find(user => user.cardNumber === localStorage.getItem('auth'));
    const bookName = this.closest('.favorites-item').children[1].textContent
    .split('By').map(word => word.trim()).join(', ');
    profileInfo.books += 1;
    profileInfo.rentedBooks.push(bookName);
    localStorage.setItem('users', JSON.stringify(profiles));
}

//Сохраняем состояние купленных книг при перезагрузке страницы
function disabledButtonBook(btn) {
    const bookName = btn.closest('.favorites-item').children[1].textContent
    .split('By').map(word => word.trim()).join(', ');
    const books = JSON.parse(localStorage.getItem('users')).find(user => user.cardNumber === localStorage.getItem('auth')).rentedBooks;
    if (books.includes(bookName)) {
        btn.disabled = true;
        btn.textContent = 'Own';
        btn.classList.add('buy--own');
    }
}

//Покупка карты
document.getElementById('buy').addEventListener('click', function(e) {
    e.preventDefault();
    const errors = document.querySelector('.errors-buy');
    errors.textContent = '';

    for (const input of document.querySelector('.buy-form')) {
        if (!input.name) continue;
        if (!input.value.trim()) {
            errors.textContent = 'Fields must not be empty';
            return;
        }
        if (input.name === 'bankCard') {
            if (input.value.length < 16) {
                errors.textContent = 'Card number must be at least 16 characters long';
                return;
            }
        }
        if (input.name === 'code') {
            if (input.value.length < 2) {
                errors.textContent = 'Code must be at least 2 characters long';
                return;
            }
        }
        if (input.name === 'cvc') {
            if (input.value.length < 3) {
                errors.textContent = 'CVC must be at least 3 characters long';
                return;
            }
        }
    }

    const profiles = JSON.parse(localStorage.getItem('users'));
    const profileInfo = profiles.find(user => user.cardNumber === localStorage.getItem('auth'));
    profileInfo.card = true;
    localStorage.setItem('users', JSON.stringify(profiles));
    location.reload();
})

console.log('Этап 1: Пользователь не зарегистрирован\n\nОграниченная карусель в блоке About\n\n1.Карусель реагирует на нажатие кнопок (кнопки под каруселью и стрелочки слева и справа в мобильной версии) и происходит анимация перелистывания. +15\n2.На экране шириной 1440px проверяем, чтобы было доступно 2 других скрытых картинки. При каждом нажатии выезжает следующая, и так до границ справа и слева. +2\n3.Выделенная кнопка под каруселью (имеется ввиду кнопка соответствующая активному слайду и которая имеет коричневый цвет) - неактивная. +2\n4.Если анимация карусели не успела завершиться, при этом нажата была следующая кнопка, то картинка не должна зависнуть в промежуточном состоянии. +2\n5.На экране шириной 768px проверяем, чтобы было доступно 4 других скрытых картинки. Для этого меняем разрешение и перезагружаем страницу. Теперь доступных перемещений становится 5. +2\n6.Неактивными становятся не только выделенные кнопки, но и стрелочки на границах карусели. +2\n\nСлайдер в блоке Favorites\n\n1."Слайдер" реагирует на нажатие кнопок панели навигации и происходит анимация затухания и проявления. +15\n2.На любой ширине экрана все 4 карточки с книгами одновременно будут плавно затухать, а затем плавно проявляться следующие. +2\n3.Анимация может быть прервана следующим нажатием на кнопку выбора поры года, но при этом анимация не должна застывать в промежуточном состоянии. Если анимация не была прервана следующим нажатием кнопки, то она должна отрабатывать до конца. +2\n4.Во время анимаций высота блока Favorites не должна меняться. +2\n5.Панель навигации "слайдера" сделана по технологии "sticky" для разрешений с одним рядом книг (768px и меньше), т.е. опускается вниз вместе со скроллом страницы, прилипая к верхней части экрана, в рамках блока Favorites. +2\n\nДо регистрации\n\n1.Нажатие на кнопку Check the card ни к чему не приведет.\n\nДо авторизации\n\n1.Иконка юзера в хедере отображается в виде силуэта.\n2.В блоке Favorites все кнопки должны иметь имя Buy, а не Own. +2\n\nЭтап 2: Пользователь на этапе регистрации\n\nМеню авторизации при нажатии на иконку пользователя\n\n1.Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. +2\n2.На разрешении 768px, при открытом бургер-меню, оно закрывается и открывается меню авторизации. +2\n');
console.log('3.То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна при открытом меню авторизации. +2\n4.Нажатие на любую область или элемент вне меню приводят к закрытию меню авторизации. +2\n\nМодальное окно REGISTER\n\n1.Дизайн модального окна соответствует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности).\n2.При нажатии на кнопку Register в открытом меню авторизации появляется модальное окно REGISTER, где есть поля First name, Last name, E-mail и Password. +2\n3.При нажатии кнопки Sign Up в блоке Digital Library Cards также появляется модальное окно REGISTER. +2\n4.Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2\n5.При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2\n6.В данном случае, ограничения по полям - все поля должны быть не пустыми. +2\n7.Пароль должен быть не короче 8 символов. +2\n8.В поле E-mail должна быть валидация типа email. +2\n\nОкончание регистрации\n\n1.Данные сохраняются в хранилище localStorage, в том числе и пароль, хотя в реальной жизни так делать нельзя. +2\n2.Иконка пользователя меняется на заглавные буквы имени. +2\n3.Отображение страницы приходит в состояние после авторизации (этап 4). +2\n4.Будет сгенерирован девятизначный Card Number случайным образом в формате 16-ричного числа. +2\n\nПри наличии регистрации, но будучи не авторизованным\n\n1.Блок Digital Library Cards. Если введенные имя и номер карты совпадают с данными пользователя, то отображается панель с информацией, вместо кнопки Check the card на 10 секунд. +2\n2.Там же после отображения информации, кнопка возвращается в прежнее состояние, а поля в форме сбрасываются. +2\n\n');
console.log('Этап 3: Пользователь на этапе входа в учетную запись после регистрации.\n\nМодальное окно LOGIN\n\n1.Дизайн модального окна соответствует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности).\n2.При нажатии на кнопку Log In появляется модальное окно LOGIN, где есть поля E-mail or readers card и Password. +2\n3.При нажатии кнопки Log In в блоке Digital Library Cards также появляется модальное окно LOGIN. +2\n4.Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2\n5.При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2\n6.Для авторизации все поля должны быть не пустыми. +2\n7.Пароль должен быть не короче 8 символов. +2\n\nБлок Favorites\n\n1.Если пользователь еще не вошел в учетную запись, то при нажатии на любую кнопку Buy открывается модальное окно LOGIN. +2\n\nЭтап 4: Пользователь после входа в учетную запись\n\nМеню профиля при нажатии на иконку с инициалами пользователя\n\n1.При наведении курсором на иконку пользователя должно отображаться полное имя пользователя (атрибут title). +2\n2.Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. +2\n3.На разрешении 768px при открытом бургер-меню, оно закрывается и открывается меню авторизации. +2\n4.То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна. +2\n5.Нажатие на любую область или элемент вне меню приводят к закрытию меню профиля. +2\n6.Вместо надписи Profile отображается девятизначный Card Number. Для Card Number можно использовать меньший шрифт чтобы надпись вметилась в контейнер, +2\n7.Нажатие на кнопку My Profile открывает модальное окно MY PROFILE. +2\n8.Нажатие на кнопку Log Out приводит к выходу пользователю из состояния авторизации, возвращаемся к этапу #1. +2\n\nМодальное окно MY PROFILE\n\n1.Дизайн модального окна соответствует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности).\n2.В случае если имя и фамилия слешиком длинные и не влазят в блок то должен произойти перенос фамилии на следующую строку.\n3.Счетчик для Visits отображает, сколько раз пользователь проходил процесс авторизации, включая самый первый - регистрацию. +2\n4.Счетчик для Books отображает, сколько у пользователя книг находятся в состоянии Own. Значение варьируется 0-16. +2\n');
console.log('5.Рядом с Card Number есть кнопка, нажатие на которую копирует код карты клиента в буфер обмена. +2\n6.Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2\n7.При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2\n\nБлок Favorites\n\n1.При нажатии на любую кнопку Buy, еще до покупки абонемента, открывается модальное окно BUY A LIBRARY CARD. +2\n2.При нажатии на любую кнопку Buy, после покупки абонемента, меняет вид кнопки на неактивную Own, добавляя единицу к счетчику книг в профиле. +2\n3.Кроме того после нажатия обновляется не только счетчик, но и название книги должно отобразится в разделе Rented Books. Название формируется по принципу <название книги>, <автор книги>. В случае если название книги слишком длинное или список стал слишком большой список книг в блоке Rented Books становится скроллируемым (по необходимости горизонтально/ вертикально или оба скролла сразу) Тайтл Rented Books скроллироваться не должен +2\n\nМодальное окно BUY A LIBRARY CARD\n\n1.Модальное окно нужно сделать шириной 640px. Будет это обрезка по 5px по бокам, или просто уменьшение длины с сохранением сетки - значения не имеет, хотя при правильной сеточной структуре, сделать это будет намного проще. +2\n2.Дизайн модального окна соответствует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности).\n3.При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2\n4.Для того, чтобы кнопка Buy была активна, все поля должны быть не пустыми. +2\n5.Bank card number должен содержать 16 цифр. С пробелами каждые 4 символа или нет - значения не имеет. +2\n6.Expiration code содержит 2 поля с ограничением в 2 цифры. +2\n7.CVC должен содержать 3 цифры. +2\n8.После удачного нажатия на кнопку Buy, окно закрывается, и больше мы к нему не возвращаемся.\n\nБлок Digital Library Cards\n\n1.При наличии авторизации вместо кнопки Check the Card будут отображаться данные пользователя и бейджи, как на дизайне LibraryCard after login in account. +2')