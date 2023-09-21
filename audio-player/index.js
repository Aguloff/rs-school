const songs = [
    {autor: 'Тараканы!', song: 'Улица свободы', album: 'Улица свободы', src: 'assets/audio/Tarakany-Ulica_Svobody.mp3', image: 'assets/img/street.jpg'},
    {autor: 'Тараканы!', song: 'Причина для ненависти', album: 'Лучшее. Враг хорошего', src: 'assets/audio/Tarakany-Prichina_dlya_nenavisti.mp3', image: 'assets/img/better.jpg'},
];

const backgroundImage = document.querySelector('.bg-image');
const player = document.querySelector('.player');
const poster = player.querySelector('.album-img');
const songName = player.querySelector('.song-name');
const autor = player.querySelector('.autor');
const currentTime = player.querySelector('.time-wripper .current-time')
const lengthTime = player.querySelector('.time-wripper .length-time');
const timeLine = player.querySelector('.time-wripper .time-line');
const progressBar = timeLine.querySelector('.line');
const volumeSlider = player.querySelector('.volume-container .volume');
const volumePercentage = volumeSlider.querySelector('.volume .volume-percentage');
const play = player.querySelector('.controls .play');
const prev = player.querySelector('.controls .prev');
const next = player.querySelector('.controls .next');
const volumeBtn = player.querySelector('.volume-icon');

let pause = true;
let audio = new Audio();
audio.volume = .75;
let currentIndex = 0;
let varForSetInterval;

function addSongToPlayer() {
    audio.src = songs[currentIndex].src;
    songName.textContent = songs[currentIndex].song;
    autor.textContent = `${songs[currentIndex].autor} - ${songs[currentIndex].album}`;
    [backgroundImage, poster].forEach(elem => elem.style.backgroundImage = `url(${songs[currentIndex].image})`);
    progressBar.style.width = '';
    if (!pause) {
        audio.play();
    }
}

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) {
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }
    
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function changeWidthProgressBar() {
    progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
    currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
}

function nextSong() {
    currentIndex ++;
    if (currentIndex > songs.length - 1) {
        currentIndex = 0;
    }
    addSongToPlayer();
}

audio.addEventListener('loadeddata', () => {
    currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
    lengthTime.textContent = getTimeCodeFromNum(audio.duration);
});

timeLine.addEventListener('click', (e) => {
    const timeLineWidth = window.getComputedStyle(timeLine).width;
    const timeToSeek = e.offsetX / parseInt(timeLineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
    changeWidthProgressBar();
});

volumeSlider.addEventListener('click', e => {
    const sliderHeight = window.getComputedStyle(volumeSlider).height;
    const newVolume = e.offsetY / parseInt(sliderHeight);
    audio.volume = newVolume;
    volumePercentage.style.height = newVolume * 100 + '%';
});

play.addEventListener('click', () => {
    if (audio.paused) {
        play.querySelector('.play-icon').classList.add('pause-bg');
        play.querySelector('.play-icon').classList.remove('play-bg');
        audio.play();
        pause = false;
        varForSetInterval = setInterval(changeWidthProgressBar, 250);
    } else {
        play.querySelector('.play-icon').classList.remove('pause-bg');
        play.querySelector('.play-icon').classList.add('play-bg');
        audio.pause();
        pause = true;
        clearInterval(varForSetInterval);
    }
});

audio.addEventListener('ended', nextSong);

prev.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = songs.length - 1;
    }
    addSongToPlayer();
});

next.addEventListener('click', nextSong);

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('mute');
    audio.muted = !audio.muted;
});

addSongToPlayer();