import React, { useEffect, useRef, useState } from 'react';

/**
 * Component that records the user's speech using the Web Speech API
 * and returns the transcribed text via the onTranscription callback.
 */
function SpeechRecorder({ onTranscription }) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition not supported');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(' ');
      setTranscript(text);
      if (onTranscription) {
        onTranscription(text);
      }
    };

    recognitionRef.current = recognition;
  }, [onTranscription]);

  const startRecording = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current && recognitionRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Could not start recording', err);
    }
  };

  const stopRecording = () => {
    recognitionRef.current && recognitionRef.current.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording} data-testid="record-btn">
        {recording ? 'Stop' : 'Record'}
      </button>
      <p data-testid="transcript">{transcript}</p>
    </div>
  );
}

export default SpeechRecorder;
