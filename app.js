class CustomTimer {
    constructor() {
        this.isRunning = false;
        this.timerInterval = null;
        this.countdownInterval = null;
        this.startTime = null;
        this.elapsedSeconds = 0;
        this.hasStarted = false;
        this.isCountingDown = false;
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
        this.timerDisplay = document.getElementById('timerState');
        this.elapsedTimeDisplay = document.getElementById('elapsedTime');
        this.stepperGroups = document.querySelectorAll('.stepper-group');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());

        document.querySelectorAll('.stepper-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = document.getElementById(btn.dataset.target);
                const delta = parseInt(btn.dataset.delta);
                const min = parseInt(input.min);
                const max = parseInt(input.max);
                const newVal = Math.min(max, Math.max(min, parseInt(input.value) + delta));
                input.value = newVal;
            });
        });
    }

    setInputsDisabled(disabled) {
        this.intervalInput.disabled = disabled;
        this.beepCountInput.disabled = disabled;
        this.countdownInput.disabled = disabled;
        this.stepperGroups.forEach(group => {
            if (disabled) {
                group.classList.add('disabled');
            } else {
                group.classList.remove('disabled');
            }
        });
    }

    start() {
        if (this.isRunning || this.isCountingDown) return;

        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.setInputsDisabled(true);

        const countdownDuration = parseInt(this.countdownInput.value);

        if (countdownDuration > 0) {
            this.isCountingDown = true;
            this.startCountdown(countdownDuration);
        } else {
            this.startTimer();
        }
    }

    startCountdown(duration) {
        let remaining = duration;
        this.timerDisplay.textContent = 'Get Ready';
        this.elapsedTimeDisplay.textContent = remaining;
        this.playCountdownBeep();

        this.countdownInterval = setInterval(() => {
            remaining--;
            this.elapsedTimeDisplay.textContent = remaining;

            if (remaining > 0) {
                this.playCountdownBeep();
            } else {
                clearInterval(this.countdownInterval);
                this.isCountingDown = false;
                this.startTimer();
            }
        }, 1000);
    }

    startTimer() {
        this.isRunning = true;

        const interval = parseInt(this.intervalInput.value) * 1000;
        let beepCounter = 0;

        if (this.hasStarted) {
            this.startTime = Date.now() - (this.elapsedSeconds * 1000);
        } else {
            this.startTime = Date.now();
            this.hasStarted = true;
        }

        this.elapsedTimeDisplay.classList.add('running');

        this.playLongBeep();
        beepCounter++;
        this.updateDisplay();

        this.timerInterval = setInterval(() => {
            if (this.isRunning) {
                const K = parseInt(this.beepCountInput.value);

                if (beepCounter % K === 0) {
                    this.playLongBeep();
                } else {
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
        this.setInputsDisabled(false);

        this.elapsedTimeDisplay.classList.remove('running');
        this.startBtn.textContent = 'Continue';
        this.timerDisplay.textContent = 'Paused';
    }

    reset() {
        this.isRunning = false;
        this.isCountingDown = false;
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.countdownInterval) clearInterval(this.countdownInterval);

        this.elapsedSeconds = 0;
        this.hasStarted = false;
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.setInputsDisabled(false);

        this.elapsedTimeDisplay.classList.remove('running');
        this.elapsedTimeDisplay.textContent = '00:00';
        this.startBtn.textContent = 'Start';
        this.timerDisplay.textContent = 'Ready';
    }

    playShortBeep() {
        try {
            if (!this.audioContext) this.audioContext = new (window.AudioContext || /** @type {any} */ (window).webkitAudioContext)();
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
        } catch (e) { console.error('Error playing short beep:', e); }
    }

    playLongBeep() {
        try {
            if (!this.audioContext) this.audioContext = new (window.AudioContext || /** @type {any} */ (window).webkitAudioContext)();
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
        } catch (e) { console.error('Error playing long beep:', e); }
    }

    playCountdownBeep() {
        try {
            if (!this.audioContext) this.audioContext = new (window.AudioContext || /** @type {any} */ (window).webkitAudioContext)();
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.frequency.value = 500;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            oscillator.start(now);
            oscillator.stop(now + 0.08);
        } catch (e) { console.error('Error playing countdown beep:', e); }
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

document.addEventListener('DOMContentLoaded', () => {
    new CustomTimer();
});
