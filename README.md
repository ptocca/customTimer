# Custom Timer

A deliberately minimal interval timer built for fitness practice — dead hangs, planks, horse stance, breathing holds, and similar timed bodyweight or static exercises.

The design is intentional: no distractions, no lap tracking, no graphs. Just a beep pattern you configure once and forget.

## Features

- **Configurable Beep Interval**: Set the time between short beeps (1–300 seconds)
- **Long Beep Pattern**: Define how many short beeps occur before a long beep signals a milestone
- **Initial Countdown**: Optional countdown before the main timer starts, so you can get into position
- **Pause & Resume**: Stop and resume while maintaining elapsed time
- **Elapsed Time Display**: Real-time MM:SS tracking
- **Installable PWA**: Add to your phone's home screen for offline use — no app store needed
- **Web Audio API**: Clean beep generation with no audio files required

## Typical Use

Set a short beep every 5–10 seconds so you know time is passing without looking at the screen. Set the long beep every 6 or 12 intervals as a milestone marker. Use the countdown to get into position before the timer starts.

Examples:
- **Dead hang**: 5s interval, long beep every 6 (marks each 30s)
- **Plank**: 10s interval, long beep every 6 (marks each minute)
- **Horse stance**: 30s interval, long beep every 4 (marks each 2 minutes)

## Usage

1. Open `index.html` in your browser, or install it to your home screen via your browser's "Add to Home Screen" option
2. Set **Beep Interval** — seconds between short beeps
3. Set **Beeps Per Long** — how many short beeps before a long beep
4. Set **Countdown** — seconds to count down before the timer starts (0 to skip)
5. Press **Start** — get into position during the countdown, then hold

## File Structure

```
customTimer/
├── index.html      # App shell and layout
├── styles.css      # Dark industrial UI
├── app.js          # Timer logic and Web Audio API
├── manifest.json   # PWA manifest for home screen installation
├── sw.js           # Service worker for offline support
├── icon.svg        # App icon
└── README.md       # This file
```

## Technologies

- **HTML5 / CSS3 / Vanilla JS** — no framework, no dependencies
- **Web Audio API** — beep generation without audio files
- **PWA** — installable, works offline via service worker

## Browser Compatibility

Any modern browser supporting ES6, Web Audio API, and Service Workers — including mobile Safari (iOS 11.3+) and Chrome for Android.

## License

MIT
