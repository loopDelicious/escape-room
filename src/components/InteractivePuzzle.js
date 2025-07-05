// src/components/InteractivePuzzle.js
import React, { useState } from "react";

export default function InteractivePuzzle({ onSolve, question }) {
  const [dragged, setDragged] = useState(false);

  const handleDragStart = (e) => {
    setDragged(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragged(false);
    onSolve("unlocked");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="puzzle-content">
      <p>{question}</p>
      <div className="interactive-area">
        <img
          src="/key.png"
          alt="Key"
          draggable
          onDragStart={handleDragStart}
          className="key"
        />
        <img
          src="/lock.png"
          alt="Lock"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="lock"
        />
      </div>
      <p>Drag the key to the lock!</p>
    </div>
  );
}
