let rules = document.querySelector('.rules');
let buttonRules = document.getElementById('buttonRules');
let rulesCross = document.getElementById('rulesCross');
buttonRules.onclick = function() {
  rules.style.display = 'block';
  audioRules.play();
}
rulesCross.onclick = () => rules.style.display = 'none';

let audioClick = document.getElementById('audioClick');
audioClick.volume = 0.3;
let audioMiss = document.getElementById('audioMiss');
audioMiss.volume = 0.3;
let audioRules = document.getElementById('audioRules');
audioRules.volume = 0.3;
let audioStart = document.getElementById('audioStart');
audioStart.volume = 0.3;

let screen = document.querySelector('.screen');

let start = document.getElementById('start');
start.onclick = startGame;

let stop = document.getElementById('stop');
stop.onclick = stopGame;

let timer = document.getElementById('timer');
let seconds = 0;

let score = document.getElementById('score');
let countScore = 0;

let allCombos = [];
let countCombo = 0;

document.oncontextmenu = function() {
  return false;
};

function random(min, max) {
  return min + Math.random() * (max - min);
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function startTimer() {
  seconds = 60;
  window.timerIdTimer = setInterval(() => {
    seconds = seconds - 1;
    timer.value = `timer: ${seconds}`;
  }, 1000);
}

function startGame() {
  audioStart.play();
  countScore = 0;
  countCombo = 0;
  allCombos.length = 0;
  stopGame();
  startTimer();
  window.timerIdGame = setInterval(() => {
    showAim();
    if (seconds == 0) {
      stopGame();
      allCombos.push(countCombo);
      showFinalAlert();
    }
  }, 500);
}

function stopGame() {
  timer.value = `timer:`;
  let aims = document.querySelectorAll('.aim');
  for (aim of aims) {
    aim.remove()
  }
  clearInterval(window.timerIdGame);
  clearInterval(window.timerIdTimer);
  screen.onmousedown = null;
}

function showAim() {
  let coordsScreen = screen.getBoundingClientRect();
  let aim = document.createElement('div');
  let coordsAim = aim.getBoundingClientRect();
  let backgrounds = ['aim1.jpg', 'aim3.jpg'];
  let randomBackground = Math.floor(Math.random() * 2);
  aim.style.backgroundImage = 'url(' + backgrounds[randomBackground] + ')';

  aim.className = "aim";

  aim.style.top = random(coordsScreen.top, coordsScreen.bottom - 50) + 'px';

  aim.style.left = random(coordsScreen.left, coordsScreen.right - 50) + 'px';

  screen.append(aim);

  screen.onmousedown = function(event) {
    if (event.which == 1 && event.target.style.backgroundImage == 'url("aim1.jpg")') {
      countScore++;
      countCombo++;
      score.value = `combo: ${countCombo} | score: ${countScore}`;
      audioClick.play();
      event.target.remove();
    } else if (event.which == 1 && event.target.style.backgroundImage == 'url("aim3.jpg")') {
      allCombos.push(countCombo);
      countScore--;
      countCombo = 0;
      score.value = `combo: ${countCombo} | score: ${countScore}`;
      audioMiss.play();
    } else if (event.which == 3 && event.target.style.backgroundImage == 'url("aim3.jpg")') {
      countScore++;
      countCombo++;
      score.value = `combo: ${countCombo} | score: ${countScore}`;
      audioClick.play();
      event.target.remove();
    } else if (event.which == 3 && event.target.style.backgroundImage == 'url("aim1.jpg")') {
      allCombos.push(countCombo);
      countScore--;
      countCombo = 0;
      score.value = `combo: ${countCombo} | score: ${countScore}`;
      audioMiss.play();
    } else {
      allCombos.push(countCombo);
      countScore--;
      countCombo = 0;
      score.value = `combo: ${countCombo} | score: ${countScore}`;
      audioMiss.play();
    }
  }
  setTimeout(() => aim.remove(), 3000);
}

let finalAlert = document.querySelector('.finalAlert');
let buttonFinalAlert = document.getElementById('buttonFinalAlert');
let alertScore = document.getElementById('alertScore');
buttonFinalAlert.onclick = () => finalAlert.style.display = 'none';
function showFinalAlert() {
  finalAlert.style.display = 'block';
  alertScore.textContent = `${countScore}`;
  alertCombo.textContent = `${getMaxOfArray(allCombos)}`;
}