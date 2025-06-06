# Fake News Speech Analyzer

This project records speech from your microphone, transcribes it using the Web Speech API and analyses the text for potential fake news.

## Installation

```bash
npm install
```

## Usage

Start the development server:

```bash
npm start
```

Open `http://localhost:3000` in your browser. Click **Record** to start recording. The transcription will be analysed automatically and any incoherences will be displayed and read aloud.

## Detection API

The project includes a simple placeholder service located in `src/services/fakeNewsService.js`. It checks for the presence of the word "fake". You can replace the implementation with calls to your own API. The service should return an array of objects with the following shape:

```js
{ incoherence: string, source: string }
```

## Tests

Run all tests once in CI mode:

```bash
CI=true npm test
```
