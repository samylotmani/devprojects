import React, { useEffect } from 'react';

/**
 * Component that speaks and displays the analysis results.
 */
function AnalysisResults({ results }) {
  useEffect(() => {
    if (!results || results.length === 0) return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(
      results.map((r) => `${r.incoherence}. Source: ${r.source}`).join(' ')
    );
    synth.speak(utter);
  }, [results]);

  if (!results || results.length === 0) {
    return <div data-testid="no-results">No inconsistencies detected.</div>;
  }

  return (
    <ul data-testid="results">
      {results.map((r, idx) => (
        <li key={idx}>
          {r.incoherence} (<a href={r.source}>{r.source}</a>)
        </li>
      ))}
    </ul>
  );
}

export default AnalysisResults;
