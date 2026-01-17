# Custom Timer

A customizable web-based timer with configurable intervals, beep patterns, and countdown functionality.

## Features

- **Configurable Short Beep Interval**: Set custom intervals (in seconds) for short beeps
- **Beep Pattern Control**: Define how many short beeps occur before a long beep
- **Initial Countdown**: Optional countdown timer before the main timer starts
- **Start/Stop/Reset Controls**: Full control over timer operation
- **Elapsed Time Display**: Real-time tracking of elapsed time in MM:SS format
- **Web Audio API**: Professional audio beeping using the Web Audio API
- **Pause & Resume**: Stop and resume the timer while maintaining elapsed time
- **Responsive Design**: Works on desktop and mobile devices with a modern gradient interface

## Usage

1. Open `index.html` in your web browser
2. Configure the timer settings:
   - **Short Beep Interval**: Time between short beeps (1-300 seconds)
   - **Beeps Before Long Beep**: Number of short beeps before a long beep (1-20)
   - **Initial Countdown**: Countdown timer before the main timer starts (0 for no countdown)
3. Click **Start** to begin
4. Click **Stop** to pause the timer
5. Click **Reset** to return to the initial state

## File Structure

```
customTimer/
├── index.html      # HTML structure and layout
├── styles.css      # Styling and responsive design
├── app.js          # JavaScript logic and timer functionality
└── README.md       # Project documentation
```

## How It Works

The Custom Timer uses JavaScript intervals to:
- Generate beep sounds at specified intervals using the Web Audio API
- Track elapsed time
- Control the timer state (running, stopped, counting down)
- Update the display with real-time information

## Technologies Used

- **HTML5**: Markup and semantic structure
- **CSS3**: Styling, gradients, and responsive design
- **JavaScript**: Timer logic, event handling, and Web Audio API
- **Web Audio API**: Audio beep generation

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript
- Web Audio API
- CSS3 Flexbox and Gradients

## License

MIT License


