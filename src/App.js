import { useState } from 'react';
import './App.css';
import SpeechRecorder from './components/SpeechRecorder';
import AnalysisResults from './components/AnalysisResults';
import { detectFakeNews } from './services/fakeNewsService';

function App() {
  const [results, setResults] = useState([]);

  const handleTranscription = async (text) => {
    const analysis = await detectFakeNews(text);
    setResults(analysis);
  };

  return (
    <div className="App">
      <h1>Fake News Detector</h1>
      <SpeechRecorder onTranscription={handleTranscription} />
      <AnalysisResults results={results} />
    </div>
  );
}

export default App;
