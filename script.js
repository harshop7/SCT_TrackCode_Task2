// Variables to keep track of the stopwatch state
let startTime; // Starting time of the stopwatch
let updatedTime; // Time updated in real-time
let running = false; // Boolean to track whether stopwatch is running or paused
let elapsedTime = 0; // Total elapsed time in milliseconds
let lapCount = 1; // Counter for lap numbers
let interval; // Interval to update the time every 10ms

// Get references to HTML elements for display
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapList = document.getElementById('lap-list');

// Function to start or stop the stopwatch
function startStop() {
  if (!running) {
    // If stopwatch is not running, start it
    startTime = new Date().getTime() - elapsedTime; // Initialize start time
    interval = setInterval(updateTime, 10); // Update the time every 10ms
    document.getElementById('start-stop').textContent = 'Pause'; // Change button text
    running = true;
  } else {
    // If stopwatch is running, pause it
    clearInterval(interval); // Stop the time update
    document.getElementById('start-stop').textContent = 'Resume'; // Change button text
    running = false;
    elapsedTime = new Date().getTime() - startTime; // Save elapsed time when paused
  }
}

// Function to update the stopwatch time on the display
function updateTime() {
  updatedTime = new Date().getTime(); // Get current time
  elapsedTime = updatedTime - startTime; // Calculate elapsed time

  // Calculate minutes, seconds, and milliseconds
  let minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  // Display the updated time with formatting
  minutesDisplay.textContent = formatTime(minutes);
  secondsDisplay.textContent = formatTime(seconds);
  millisecondsDisplay.textContent = formatTime(milliseconds);
}

// Function to format time by adding leading zeros
function formatTime(time) {
  return time < 10 ? '0' + time : time; // Add leading zero if time is less than 10
}

// Function to reset the stopwatch to 00:00:00
function resetStopwatch() {
  clearInterval(interval); // Stop the stopwatch
  elapsedTime = 0; // Reset elapsed time
  running = false;
  document.getElementById('start-stop').textContent = 'Start'; // Reset button text
  minutesDisplay.textContent = '00'; // Reset time display
  secondsDisplay.textContent = '00'; 
  millisecondsDisplay.textContent = '00';
  lapList.innerHTML = ''; // Clear lap times
  lapCount = 1; // Reset lap count
}

// Function to record a lap time and display it
function recordLap() {
  if (running) {
    // Calculate lap time and format it
    let minutes = formatTime(Math.floor((elapsedTime / 1000 / 60) % 60));
    let seconds = formatTime(Math.floor((elapsedTime / 1000) % 60));
    let milliseconds = formatTime(Math.floor((elapsedTime % 1000) / 10));

    // Create a new list item for the lap
    let lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    lapItem.innerHTML = `Lap ${lapCount}: <span>${minutes}:${seconds}:${milliseconds}</span>`;
    lapList.appendChild(lapItem); // Add the lap to the list
    lapCount++; // Increment the lap count
  }
}
