const timeToString = (time) => {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}


let interval;
let startTime;
let lastTime = 0;
let lastLap = 0;

const controlsInitial = document.querySelector('.controls-initial');
const controlsActive = document.querySelector('.controls-active');
const controlsPaused = document.querySelector('.controls-paused');

const value = document.querySelector('.value');
const table = document.querySelector('.table');
const tableRow = document.querySelector('.table-row');

const startButtons = document.querySelectorAll('.button--start');
const pauseButton = document.querySelector('.button--pause');
const resetButton = document.querySelector('.button--reset');
const lapButton = document.querySelector('.button--lap');


const start = () => {
    startTime = Date.now() - lastTime;
    interval = setInterval(() => {
        lastTime = Date.now() - startTime;
        value.innerHTML = timeToString(lastTime);
    }, 10);
    controlsInitial.classList.add('hidden');
    controlsActive.classList.remove('hidden');
    controlsPaused.classList.add('hidden');
};

const pause = () => {
    clearInterval(interval);
    controlsPaused.classList.remove('hidden');
    controlsActive.classList.add('hidden');
};

const clearTable = () => {
    lastLap = 0;
    const tableValues = Array.from(table.children).slice(1)
    for (const item of tableValues) {
        item.remove();
    };
};

const reset = () => {
    clearInterval(interval);
    clearTable();
    lastTime = 0;
    value.innerHTML = timeToString(0);
    table.classList.add('hidden');
    controlsPaused.classList.add('hidden');
    controlsInitial.classList.remove('hidden');
};

const newCircleDiv = (lap, time) => `
    <div class="table-row">
    <div class="table-cell">${lap}</div>
    <div class="table-cell">${timeToString(time)}</div>
    </div>
`;

const lap = () => {
    lastLap += 1;
    tableRow.insertAdjacentHTML('afterend', newCircleDiv(lastLap, lastTime));
    table.classList.remove('hidden');
};


startButtons.forEach((startButton) => {
    startButton.addEventListener('click', start);
});

pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
