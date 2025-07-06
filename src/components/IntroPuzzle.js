import React, { useState } from "react";

export default function IntroPuzzle({ puzzle, onSolve }) {
  const [started, setStarted] = useState(false);
  const handleStart = () => {
    setStarted(true);
    if (onSolve) {
      onSolve();
    }
  };

  // Use puzzle.className if present, fallback to "intro-content"
  const contentClass = puzzle.className
    ? `intro-content ${puzzle.className}`
    : "intro-content";

  return (
    <div className="intro-puzzle">
      {!started ? (
        <div className={contentClass}>
          {puzzle.image && (
            <img src={puzzle.image} alt="Intro" className="intro-image" />
          )}
          <h1>{puzzle.title || "Welcome"}</h1>
          <p>{puzzle.description}</p>
          <button
            className="sci-fi-btn sci-fi-btn-primary"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="intro-started">
          <p>Get ready to solve the mysteries of Futura!</p>
        </div>
      )}
    </div>
  );
}
