// Game state
let gameTimer = 0;
let timerInterval = null;
let isTimerRunning = false;

// Score functions with epic effects
function addScore(team, points) {
    const scoreEl = document.getElementById(`score-${team}`);
    let currentScore = parseInt(scoreEl.textContent, 10);
    const newScore = currentScore + points;
    
    // Update score with animation
    scoreEl.textContent = newScore;
    
    // Add visual effects
    scoreEl.classList.add('score-update', 'flash');
    setTimeout(() => {
        scoreEl.classList.remove('score-update', 'flash');
    }, 500);
    
    // Check for winner
    checkWinner();
    
    // Play sound effect (if you want to add audio later)
    playScoreSound();
}

function subtractScore(team, points) {
    const scoreEl = document.getElementById(`score-${team}`);
    let currentScore = parseInt(scoreEl.textContent, 10);
    const newScore = Math.max(0, currentScore - points); // Don't go below 0
    
    scoreEl.textContent = newScore;
    scoreEl.classList.add('flash');
    setTimeout(() => {
        scoreEl.classList.remove('flash');
    }, 500);
}

function resetScores() {
    document.getElementById('score-home').textContent = '0';
    document.getElementById('score-away').textContent = '0';
    hideWinnerOverlay();
    
    // Reset timer
    gameTimer = 0;
    updateTimerDisplay();
    if (isTimerRunning) {
        toggleTimer();
    }
}

// Timer functions
function toggleTimer() {
    const button = event.target;
    
    if (isTimerRunning) {
        // Stop timer
        clearInterval(timerInterval);
        isTimerRunning = false;
        button.textContent = 'Start Timer';
        button.style.background = 'rgba(255, 255, 255, 0.1)';
    } else {
        // Start timer
        timerInterval = setInterval(() => {
            gameTimer++;
            updateTimerDisplay();
        }, 1000);
        isTimerRunning = true;
        button.textContent = 'Stop Timer';
        button.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
    }
}

function addTime() {
    gameTimer += 60; // Add 1 minute
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(gameTimer / 60);
    const seconds = gameTimer % 60;
    const timerEl = document.getElementById('timer');
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Winner detection
function checkWinner() {
    const homeScore = parseInt(document.getElementById('score-home').textContent);
    const awayScore = parseInt(document.getElementById('score-away').textContent);
    
    // Check if someone reached 21 points (or any winning condition you want)
    if (homeScore >= 21 || awayScore >= 21) {
        const winner = homeScore > awayScore ? 'HOME' : 'AWAY';
        showWinnerOverlay(winner);
    }
}

function showWinnerOverlay(winner) {
    const overlay = document.getElementById('winner-overlay');
    const winnerText = document.getElementById('winner-text');
    
    winnerText.innerHTML = `
        🏆 ${winner} WINS! 🏆<br>
        <span style="font-size: 2rem; margin-top: 1rem; display: block;">
            Final Score: ${document.getElementById('score-home').textContent} - ${document.getElementById('score-away').textContent}
        </span>
    `;
    
    overlay.classList.add('show');
    
    // Confetti effect (you could add a confetti library here)
    createConfetti();
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideWinnerOverlay();
    }, 5000);
}

function hideWinnerOverlay() {
    document.getElementById('winner-overlay').classList.remove('show');
}

// Simple confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        const animation = confetti.animate([
            { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(720deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'ease-in'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Sound effect (silent for now, but ready for audio)
function playScoreSound() {
    // You can add audio here later:
    // const audio = new Audio('score-sound.mp3');
    // audio.play();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'q': addScore('home', 1); break;
        case 'w': addScore('home', 2); break;
        case 'e': addScore('home', 3); break;
        case 'u': addScore('away', 1); break;
        case 'i': addScore('away', 2); break;
        case 'o': addScore('away', 3); break;
        case 'r': resetScores(); break;
        case ' ': e.preventDefault(); toggleTimer(); break;
    }
});

// Click overlay to dismiss winner screen
document.getElementById('winner-overlay').addEventListener('click', hideWinnerOverlay);

// Initialize timer display
updateTimerDisplay();
