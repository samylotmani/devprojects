import { render, screen, act } from '@testing-library/react';
import App from './App';
import * as service from './services/fakeNewsService';

describe('App speech analysis flow', () => {
  test('displays analysis results when speech is recognized', async () => {
    jest.spyOn(service, 'detectFakeNews').mockResolvedValue([
      { incoherence: 'Contains potential fake news keyword "fake".', source: 'local-check' }
    ]);

    const SpeechRecognitionMock = function() {
      this.start = jest.fn();
      this.stop = jest.fn();
      this.onresult = null;
      window.__recog = this;
    };
    window.SpeechRecognition = SpeechRecognitionMock;
    navigator.mediaDevices = { getUserMedia: jest.fn().mockResolvedValue(true) };

    render(<App />);

    act(() => {
      window.__recog.onresult({ results: [[{ transcript: 'fake' }]] });
    });

    const item = await screen.findByText(/potential fake news/i);
    expect(item).toBeInTheDocument();
  });
});

