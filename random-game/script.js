const bg = document.querySelector('.background');

for (let i = 0; i < 200; i++) {
  const div = document.createElement('div');
  div.classList.add('cell');
  bg.append(div);
}