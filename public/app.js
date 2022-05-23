// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);
/*
  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);
*/
  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
 /* let formattedMS = ms.toString().padStart(2, "0");*/

  return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

// formated date

let today = new Date();
let dd = today.getDate();

let mm = today.getMonth()+1;
const yyyy = today.getFullYear();
if(dd<10)
{
    dd=`0${dd}`;
}

if(mm<10)
{
    mm=`0${mm}`;
}
today = `${dd}/${mm}/${yyyy}`;
// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  showButton("PAUSE");
}

function pause() {
  clearInterval(timerInterval);
  showButton("PLAY");
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
  showButton("PLAY");
}

function save() {
  clearInterval(timerInterval);
}

// Create function to display buttons

function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
  const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}

// Create event listeners

let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");
let saveButton = document.getElementById("saveButton");

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);


saveButton.addEventListener('click', async event =>  {
  save()
  let savedData = timeToString(elapsedTime);
  let date = today;
  const data = { savedData, date };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('/create', options);
  const json = await response.json();
  console.log(json);
});
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
saveButton.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// When the user pretend to leave page
window.onbeforeunload = s => "";
