let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const trackBtn = document.getElementById('track-btn');
const lapList = document.getElementById('lap-list');
const trackList = document.getElementById('track-list');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
trackBtn.addEventListener('click', recordTrack);

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1000);
    isRunning = true;
  }
}

function pauseStopwatch() {
  if (isRunning) {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(intervalId);
  isRunning = false;
  elapsedTime = 0;
  startTime = 0;
  timeDisplay.textContent = '00:00:00';
  lapList.innerHTML = '';
  trackList.innerHTML = '';
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  const totalSeconds = Math.floor(elapsedTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
  return unit < 10 ? '0' + unit : unit;
}

function recordLap() {
  if (!isRunning && elapsedTime === 0) return; // Prevent recording lap when stopwatch is not running or just reset
  const lapTime = timeDisplay.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
}

function recordTrack() {
  if (!isRunning && elapsedTime === 0) return; // Prevent recording track when stopwatch is not running or just reset
  const trackTime = timeDisplay.textContent;
  const trackItem = document.createElement('li');
  trackItem.textContent = `Track recorded at: ${trackTime}`;
  trackList.appendChild(trackItem);
}
