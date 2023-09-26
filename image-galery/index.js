const app = document.querySelector('.app');
const input = document.querySelector('.search-input');
const form = document.querySelector('.search');
const cancelBtn = document.querySelector('.cancel-btn');

async function getData(query = 'green') {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=tksLiuFGK-WHceAyzLKnr0mhsXZXEFd2n8jEf-dzgwY`);
    const data = await res.json();
    showImg(data.results);
}

function showImg(data) {
    app.innerHTML = '';

    if (!data.length) {
        const p = document.createElement('p');
        p.classList.add('not-found');
        p.textContent = 'Поиск не дал результатов :(';
        app.append(p);
    }

    data.forEach(elem => {
        const img = document.createElement('img');
        img.src = elem.urls.regular;
        img.alt = elem.alt_description;
        app.append(img);
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