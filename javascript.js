// Get DOM elements
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.getElementById('set-alarm-btn');
const clearAlarmButton = document.getElementById('clear-alarm-btn');

let alarmIntervalId; // Stores the interval ID for the alarm

// Set the alarm
setAlarmButton.addEventListener('click', () => {
  const alarmTime = alarmTimeInput.value;
  
  if (validateAlarmTime(alarmTime)) {
    const now = new Date();
    const alarm = new Date(now.toDateString() + ' ' + alarmTime);
    const timeDiff = alarm - now;

    if (timeDiff > 0) {
      setAlarmButton.disabled = true;
      alarmTimeInput.disabled = true;
      clearAlarmButton.disabled = false;

      alarmIntervalId = setInterval(() => {
        const now = new Date();
        const timeDiff = alarm - now;

        if (timeDiff <= 0) {
          playAlarm();
          clearInterval(alarmIntervalId);
        }
      }, 1000);
    } else {
      alert('Invalid alarm time. Please set a future time.');
    }
  } else {
    alert('Invalid alarm time format. Please use HH:MM format.');
  }
});

// Clear the alarm
clearAlarmButton.addEventListener('click', () => {
  clearAlarm();
});

// Validate the alarm time format
function validateAlarmTime(alarmTime) {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(alarmTime);
}

// Play the alarm sound
function playAlarm() {
  const audio = new Audio('alarm_sound.mp3');
  audio.loop = true;
  audio.play();
  alert('Wake up!');
}

// Clear the alarm settings
function clearAlarm() {
  clearInterval(alarmIntervalId);
  setAlarmButton.disabled = false;
  alarmTimeInput.disabled = false;
  clearAlarmButton.disabled = true;
  alarmTimeInput.value = '';
}
