const bg = document.querySelector('.background');
const playField = document.querySelector('.play-field');
const scoreValue = document.getElementById('score-value');

for (let i = 0; i < 200; i++) {
  const div = document.createElement('div');
  div.classList.add('cell');
  bg.append(div);
}

const snake = {
  x: 5,
  y: 10,
}

const direction = {
  x: 0,
  y: 0,
}

const food = {
  x: 0,
  y: 0,
}

const snakeTail = [];
let setItervalId;
let score = 0;

function createFood() {
  food.x = Math.floor((Math.random() * 10) + 1);
  food.y = Math.floor((Math.random() * 20) + 1);
  snakeTail.forEach(item => {
    if (item[0] === food.x && item[1] === food.y) {
      createFood();
    }
  });
}

function gameOver() {
  clearInterval(setItervalId);
  alert('Game Over! Press OK to replay...');
  location.reload();
}

function renderGame() {
  const foodDiv = document.createElement('div');

  foodDiv.classList.add('cell-active');

  if (snake.x === food.x && snake.y === food.y) {
    snakeTail.push([food.x, food.y]);
    score++;
    scoreValue.textContent = score;
    createFood();
  }

  snake.x += direction.x;
  snake.y += direction.y;

  if (snake.x <= 0 || snake.x > 10 || snake.y <= 0 || snake.y > 20) {
    return gameOver();
  }

  if (direction.x || direction.y) {
    for (let i = snakeTail.length - 1; i > 0; i--) {
      snakeTail[i] = snakeTail[i - 1];
    }
  }

  snakeTail[0] = [snake.x, snake.y];

  foodDiv.style.gridArea = food.y + '/' + food.x;

  playField.innerHTML = '';

  for (let i = 0; i < snakeTail.length; i++) {
    if (i !== 0 && snakeTail[0][1] === snakeTail[i][1] && snakeTail[0][0] === snakeTail[i][0]) {
      console.log(snakeTail[i], snakeTail[0]);
      return gameOver();
    }

    const snakeItem = document.createElement('div');
    snakeItem.classList.add('cell-active');
    snakeItem.style.gridArea = snakeTail[i][1] + '/' + snakeTail[i][0];
    playField.append(snakeItem);
  }

  playField.append(foodDiv);
}

function turn(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y !== 1) {
        direction.x = 0;
        direction.y = -1;
      }
      break;

    case 'ArrowRight':
      if (direction.x !== -1) {
        direction.x = 1;
        direction.y = 0;
      }
      break;

    case 'ArrowDown':
      if (direction.y !== -1) {
        direction.x = 0;
        direction.y = 1;
      }
      break;

    case 'ArrowLeft':
      if (direction.x !== 1) {
        direction.x = -1;
        direction.y = 0;
      }
      break;
  }
}

createFood();

setItervalId = setInterval(renderGame, 140);

document.addEventListener('keydown', turn);