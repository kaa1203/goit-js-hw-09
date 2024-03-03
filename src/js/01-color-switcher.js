const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.body;

let timerId = null;

const onStart = () => {
  timerId = setInterval(() => body.style.background = getRandomHexColor(), 1000);
  stopBtn.disabled = false;
  startBtn.disabled = true;
} 

const onStop = () => {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timerId);
}

startBtn.addEventListener("click", onStart);
stopBtn.addEventListener("click", onStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
