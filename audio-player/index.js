const backgroundImage = document.querySelector('.bg-image');
const player = document.querySelector('.player');

const songs = [
    {name: 'Тараканы', album: 'Улица свободы', src: 'assets/audio/Tarakany-Ulica_Svobody.mp3', image: 'assets/img/street.jpg'},
    {name: 'Тараканы', album: 'Лучшее. Враг хорошего', src: 'assets/audio/Tarakany-Prichina_dlya_nenavisti.mp3', image: 'assets/img/better.jpg'},
];

backgroundImage.style.backgroundImage = `url(${songs[0].image})`;

const audio = new Audio();


