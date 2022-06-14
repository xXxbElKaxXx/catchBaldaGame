let rules = document.querySelector('.rules');
let buttonRules = document.getElementById('buttonRules');
let rulesCross = document.getElementById('rulesCross');
buttonRules.onclick = function() {
  rules.style.display = 'block';
  audioRules.play();
}
rulesCross.onclick = () => rules.style.display = 'none';

let settings = document.querySelector('.settings');
let buttonSettings = document.getElementById('buttonSettings');
let SettingsCross = document.getElementById('settingsCross');
buttonSettings.onclick = function() {
  settings.style.display = 'block';
  audioSettings.play();
}
settingsCross.onclick = () => {
  settings.style.display = 'none';
  event.stopPropagation();
}

let audioClick = document.getElementById('audioClick');
audioClick.volume = 0.3;
let audioMiss = document.getElementById('audioMiss');
audioMiss.volume = 0.3;
let audioRules = document.getElementById('audioRules');
audioRules.volume = 0.3;
let audioStart = document.getElementById('audioStart');
audioStart.volume = 0.3;
let audioSettings = document.getElementById('audioSettings');
audioSettings.volume = 0.3;

let screen = document.querySelector('.screen');

let buttonStart = document.getElementById('buttonStart');
buttonStart.onclick = startGame;

let buttonStop = document.getElementById('buttonStop');
buttonStop.onclick = stopGame;

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

let arraySetSpeed = document.getElementsByName('setSpeed');
let arraySetTimer = document.getElementsByName('setTimer');

function getCheckedRadio(array) {
  for (let radio of array) {
    if (radio.checked) return radio.value
  }
}

function startTimer() {
  seconds = getCheckedRadio(arraySetTimer);
  window.timerIdTimer = setInterval(() => {
    seconds--;
    timer.value = `timer: ${seconds}`;
  }, 1000);
}

function closeOtherDisplays() {
  rules.style.display = 'none';
  settings.style.display = 'none';
  finalAlert.style.display = 'none';
}

function startGame() {
  audioStart.play();
  closeOtherDisplays();
  countScore = 0;
  countCombo = 0;
  allCombos.length = 0;
  stopGame();
  screen.addEventListener("mousedown", countClicker);
  document.addEventListener("mouseover", countKeyClicker);
  startTimer();
  window.timerIdGame = setInterval(() => {
    showAim();
    if (seconds == 0) {
      stopGame();
      allCombos.push(countCombo);
      showFinalAlert();
    }
  }, getCheckedRadio(arraySetSpeed));
}

function stopGame() {
  screen.removeEventListener("mousedown", countClicker);
  document.removeEventListener("mouseover", countKeyClicker);
  document.onkeydown = null;
  timer.value = `timer:`;
  let aims = screen.querySelectorAll('.aim');
  for (aim of aims) {
    aim.remove()
  }
  clearInterval(window.timerIdGame);
  clearInterval(window.timerIdTimer);
}

function countClicker(event) {
  if (event.which == 1 && event.target.style.backgroundImage == 'url("aim1.jpg")') {
    countScore = countScore + 1;
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

function countKeyClicker(event) {
  if (event.target.style.backgroundImage == 'url("aim1.jpg")') {
    document.onkeydown = function(e) {
      if (e.code == 'KeyX') {
        countScore++;
        countCombo++;
        score.value = `combo: ${countCombo} | score: ${countScore}`;
        audioClick.play();
        event.target.remove();
      }
      else if (e.code == 'KeyZ') {
        allCombos.push(countCombo);
        countScore--;
        countCombo = 0;
        score.value = `combo: ${countCombo} | score: ${countScore}`;
        audioMiss.play();
      }
    }
  } else if (event.target.style.backgroundImage == 'url("aim3.jpg")') {
    document.onkeydown = function(e) {
      if (e.code == 'KeyZ') {
        countScore++;
        countCombo++;
        score.value = `combo: ${countCombo} | score: ${countScore}`;
        audioClick.play();
        event.target.remove();
      }
      else if (e.code == 'KeyX') {
        allCombos.push(countCombo);
        countScore--;
        countCombo = 0;
        score.value = `combo: ${countCombo} | score: ${countScore}`;
        audioMiss.play();
      }
    }
  } else if (event.target == screen) {
    document.onkeydown = function(e) {
      if (e.code == 'KeyX' || e.code == 'KeyZ') {
        allCombos.push(countCombo);
        countScore--;
        countCombo = 0;
        score.value = `combo: ${countCombo} | score: ${countScore}`;
        audioMiss.play();
      }
    }
  } else if (event.relatedTarget == screen) {
    document.onkeydown = null
  }
}

document.onmouseout = function(event) {
  for (let button of document.getElementsByTagName('button')) {
    if (event.relatedTarget == button) {
      document.onkeydown = function(e) {
        if (e.code == 'KeyX') {
          event.relatedTarget.onclick()
        }
      }
    } else if (event.target == button) {
      document.onkeydown = null
    }
  }
  for (let span of document.getElementsByTagName('span')) {
    if (event.relatedTarget == span) {
      document.onkeydown = function(e) {
        if (e.code == 'KeyX') {
          event.relatedTarget.onclick()
        }
      }
    } else if (event.target == span) {
      document.onkeydown = null
    }
  }
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

  setTimeout( () => aim.remove() , 3000);
}

let finalAlert = document.querySelector('.finalAlert');
let buttonFinalAlert = document.getElementById('buttonFinalAlert');
let alertTimer = document.getElementById('alertTimer');
let alertDifficult = document.getElementById('alertDifficult');
let alertScore = document.getElementById('alertScore');
let alertCombo = document.getElementById('alertCombo');
buttonFinalAlert.onclick = () => finalAlert.style.display = 'none';
function showFinalAlert() {
  finalAlert.style.display = 'block';
  alertTimer.textContent = `${getCheckedRadio(arraySetTimer)} sec`;
  alertScore.textContent = `${countScore}`;
  alertCombo.textContent = `${getMaxOfArray(allCombos)}`;
  if (getCheckedRadio(arraySetSpeed) == 800) {
    alertDifficult.textContent = `easy`;
  }
  if (getCheckedRadio(arraySetSpeed) == 500) {
    alertDifficult.textContent = `normal`;
  }
  if (getCheckedRadio(arraySetSpeed) == 400) {
    alertDifficult.textContent = `hard`;
  }
  if (getCheckedRadio(arraySetSpeed) == 300) {
    alertDifficult.textContent = `nightmer`;
  }
}
