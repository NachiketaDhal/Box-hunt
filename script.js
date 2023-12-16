let interval = null;
let intervalId = null;
let isInitial = true;
const intervalInput = document.querySelector("#interval");
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const resetButton = document.querySelector(".reset");
const target = document.querySelector(".target");
const game = document.querySelector(".game");
const table = document.querySelector("table");
const X_LIMIT = 613;
const Y_LIMIT = 90;
let numberOfMouseClicks = 0;
let prevnumberOfMouseClicks = 0;
let reactionTime = null;
let prevTime = null;
let newTime = null;
let baseTime = 0;

intervalInput.addEventListener("change", handleInterval);
startButton.addEventListener("click", startHandler);
resetButton.addEventListener("click", resetGame);
pauseButton.addEventListener("click", pauseGame);

function handleInterval(e) {
  interval = e.target.value; // In seconds
}

function startHandler() {
  console.log(interval);
  if (!interval) return;
  prevTime = Date.now();
  target.style.opacity = 1;
  target.style.pointerEvents = "none";

  intervalId = setInterval(() => {
    baseTime += interval * 1000;
    const randomX = Math.floor(Math.random() * X_LIMIT);
    const randomY = Math.floor(Math.random() * Y_LIMIT);

    target.style.pointerEvents = "auto";
    target.style.opacity = 1;
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;

    prevTime = Date.now();

    isInitial = false;

  }, interval * 1000);
  target.addEventListener("click", targetClickHandler);
}

function targetClickHandler() {
  const newTime = Date.now();
  reactionTime = (baseTime + (newTime - prevTime)) / 1000;
  baseTime = 0;
  numberOfMouseClicks++;
  target.style.pointerEvents = "none";
  addEntryToTheTable();
}

function resetGame() {
  target.style.opacity = 0;
  table.innerHTML = `<tr>
  <th>Mouse click</th>
  <th>Reaction time</th>
</tr>`;
  intervalInput.value = "";
  if (intervalId) clearInterval(intervalId);
  numberOfMouseClicks = 0;
  reactionTime = null;
  prevnumberOfMouseClicks = 0;
  prevTime = null;
  interval = null;
  intervalId = null;
  isInitial = true;
  baseTime = 0;
}

function pauseGame() {
  if (intervalId) clearInterval(intervalId);
}

function addEntryToTheTable() {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const tdR = document.createElement("td");
  td.innerText = numberOfMouseClicks;
  tdR.innerText = reactionTime;
  if (prevnumberOfMouseClicks != numberOfMouseClicks) {
    tr.appendChild(td);
    tr.appendChild(tdR);
    if (!isInitial) {
      table.appendChild(tr);
    }
  }
  prevnumberOfMouseClicks = numberOfMouseClicks;
}