const app = document.querySelector('.app');
const input = document.querySelector('.search-input');
const form = document.querySelector('.search');
const cancelBtn = document.querySelector('.cancel-btn');

async function getData(query = 'green') {
    try {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=tksLiuFGK-WHceAyzLKnr0mhsXZXEFd2n8jEf-dzgwY`);
        const data = await res.json();
        showImg(data.results);
    } catch {
        errorMesage('Сервер сломался, попробуйте позже');
    }
}

function errorMesage(text) {
    app.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = text;
    app.append(p);
}

function showImg(data) {
    if (!data.length) {
        return errorMesage('Поиск не дал результатов :(');
    }
    
    app.innerHTML = '';

    data.forEach(elem => {
        const img = document.createElement('img');
        img.src = elem.urls.regular;
        img.alt = elem.alt_description;
        app.append(img);

        img.addEventListener('click', () => {
            window.open(elem.urls.full, '_blank');
        })
    });
}

input.addEventListener('input', () => {
    if (!cancelBtn.classList.contains('cancel-btn--active')) {
        cancelBtn.classList.add('cancel-btn--active');
    }
    if (!input.value) {
        cancelBtn.classList.remove('cancel-btn--active');
    }
});

cancelBtn.addEventListener('click', (e) => {
    input.value = '';
    cancelBtn.classList.remove('cancel-btn--active');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!input.value.trim()) {
        return;
    }

    getData(input.value.trim());
});

getData();