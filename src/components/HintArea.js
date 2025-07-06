import React from "react";

export default function HintArea({ hints, revealedCount, onShowHint }) {
  return (
    <div className="hint-area">
      <h4>Need help?</h4>
      <ul>
        {hints.slice(0, revealedCount).map((hint, idx) => (
          <li key={idx}>{hint}</li>
        ))}
      </ul>
      {revealedCount < hints.length && (
        <button onClick={onShowHint}>Show Hint</button>
      )}
    </div>
  );
}
