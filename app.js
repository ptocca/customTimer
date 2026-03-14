class CustomTimer {
    constructor() {
        this.isRunning = false;
        this.timerInterval = null;
        this.countdownInterval = null;
        this.startTime = null;
        this.elapsedSeconds = 0;
        this.hasStarted = false;
        this.isCountingDown = false;
        
        // Audio context for Web Audio API
        this.audioContext = null;
        
        this.setupElements();
        this.setupEventListeners();
    }

    setupElements() {
        this.intervalInput = document.getElementById('interval');
        this.beepCountInput = document.getElementById('beepCount');
        this.countdownInput = document.getElementById('countdown');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.timerDisplay = document.querySelector('.timer-text');
        this.elapsedTimeDisplay = document.getElementById('elapsedTime');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    start() {
        if (this.isRunning || this.isCountingDown) return;

        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.intervalInput.disabled = true;
        this.beepCountInput.disabled = true;
        this.countdownInput.disabled = true;

        const countdownDuration = parseInt(this.countdownInput.value);

        if (countdownDuration > 0) {
            // Start countdown phase
            this.isCountingDown = true;
            this.startCountdown(countdownDuration);
        } else {
            // Skip countdown and start timer immediately
            this.startTimer();
        }
    }

    startCountdown(duration) {
        let remaining = duration;
        this.timerDisplay.textContent = remaining;
        
        // Play first countdown beep
        this.playCountdownBeep();

        this.countdownInterval = setInterval(() => {
            remaining--;
            this.timerDisplay.textContent = remaining;
            
            if (remaining > 0) {
                this.playCountdownBeep();
            } else {
                // Countdown complete, start the actual timer
                clearInterval(this.countdownInterval);
                this.isCountingDown = false;
                this.startTimer();
            }
        }, 1000);
    }

    startTimer() {
        this.isRunning = true;

        const interval = parseInt(this.intervalInput.value) * 1000; // Convert to milliseconds
        let beepCounter = 0;
        
        // If resuming, calculate the new start time based on elapsed seconds
        if (this.hasStarted) {
            this.startTime = Date.now() - (this.elapsedSeconds * 1000);
        } else {
            this.startTime = Date.now();
            this.hasStarted = true;
        }
        
        // Play long beep to signal start of elapsed time
        this.playLongBeep();
        beepCounter++;
        this.updateDisplay();

        // Set up repeating beeps
        this.timerInterval = setInterval(() => {
            if (this.isRunning) {
                const K = parseInt(this.beepCountInput.value);
                
                if (beepCounter % K === 0) {
                    // Play long beep
                    this.playLongBeep();
                } else {
                    // Play short beep
                    this.playShortBeep();
                }
                
                beepCounter++;
                this.updateDisplay();
            }
        }, interval);
    }

    stop() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        
        if (this.isCountingDown) {
            this.isCountingDown = false;
            clearInterval(this.countdownInterval);
        }
        
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.intervalInput.disabled = false;
        this.beepCountInput.disabled = false;
        this.countdownInput.disabled = false;
        
        // Update button text to "Continue"
        this.startBtn.textContent = 'Continue';
        this.timerDisplay.textContent = 'Paused';
    }

    reset() {
        this.isRunning = false;
        this.isCountingDown = false;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        
        this.elapsedSeconds = 0;
        this.hasStarted = false;
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.intervalInput.disabled = false;
        this.beepCountInput.disabled = false;
        this.countdownInput.disabled = false;
        
        // Reset button text to "Start"
        this.startBtn.textContent = 'Start';
        this.updateDisplay();
        this.timerDisplay.textContent = 'Ready';
    }

    playShortBeep() {
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            const ctx = this.audioContext;
            const now = ctx.currentTime;
            
            // Create a short beep: 600Hz frequency, 100ms duration
            const frequency = 600;
            const duration = 0.1; // 100ms
            
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            // Set volume (0.3 = 30% to avoid too loud)
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
        } catch (e) {
            console.error('Error playing short beep:', e);
        }
    }

    playLongBeep() {
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            const ctx = this.audioContext;
            const now = ctx.currentTime;
            
            // Create a long beep: 800Hz frequency, 300ms duration
            const frequency = 800;
            const duration = 0.3; // 300ms
            
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            // Set volume
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
        } catch (e) {
            console.error('Error playing long beep:', e);
        }
    }

    playCountdownBeep() {
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            const ctx = this.audioContext;
            const now = ctx.currentTime;
            
            // Create a countdown beep: 500Hz frequency, 80ms duration
            const frequency = 500;
            const duration = 0.08; // 80ms
            
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            // Set volume
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
        } catch (e) {
            console.error('Error playing countdown beep:', e);
        }
    }

    updateDisplay() {
        if (this.isRunning) {
            this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
            this.timerDisplay.textContent = 'Running';
        }
        
        const minutes = Math.floor(this.elapsedSeconds / 60);
        const seconds = this.elapsedSeconds % 60;
        this.elapsedTimeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CustomTimer();
});
