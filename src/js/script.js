// Countdown Timer
function startCountdown(durationInSeconds) {
    let timer = durationInSeconds;
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const interval = setInterval(function () {
        const days = Math.floor(timer / (24 * 3600));
        const hours = Math.floor((timer % (24 * 3600)) / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = Math.floor(timer % 60);

        if (daysElement) daysElement.textContent = days < 10 ? "0" + days : days;
        if (hoursElement) hoursElement.textContent = hours < 10 ? "0" + hours : hours;
        if (minutesElement) minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
        if (secondsElement) secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            clearInterval(interval);
            // Optional: Handle timer expiry
        }
    }, 1000);
}

// Initialize timer with 4 days, 13 hours, 34 minutes, 56 seconds
// Total seconds = (4 * 24 * 3600) + (13 * 3600) + (34 * 60) + 56
const initialDuration = (4 * 86400) + (13 * 3600) + (34 * 60) + 56;

// Button Event Listeners
function setupButtonListeners() {
    const joinNowBtn = document.querySelector('.join-now-button');
    const loginBtn = document.querySelector('.login-button');

    if (joinNowBtn) {
        joinNowBtn.addEventListener('click', function() {
            console.log('Join now button clicked');
            alert('Join Now - Redirect to sign up page');
            // You can replace this with actual navigation
            // window.location.href = '/signup';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            console.log('Log in button clicked');
            alert('Log In - Redirect to login page');
            // You can replace this with actual navigation
            // window.location.href = '/login';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    startCountdown(initialDuration);
    setupButtonListeners();
});
