import React, { useState, useEffect } from "react";
import puzzles from "./puzzles";
import TextPuzzle from "./components/TextPuzzle";
import ImagePuzzle from "./components/ImagePuzzle";
import InteractivePuzzle from "./components/InteractivePuzzle";
import HintArea from "./components/HintArea";
import "./App.css";

function App() {
  // Load progress from localStorage or default to 0
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem("escapeRoomCurrent");
    return saved ? Number(saved) : 0;
  });
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  // Load hint count for current puzzle from localStorage
  const [hintCount, setHintCount] = useState(() => {
    const saved = localStorage.getItem("escapeRoomHintCount");
    return saved ? Number(saved) : 0;
  });

  const puzzle = puzzles[current];

  // Save progress to localStorage whenever current or hintCount changes
  useEffect(() => {
    localStorage.setItem("escapeRoomCurrent", current);
    localStorage.setItem("escapeRoomHintCount", hintCount);
  }, [current, hintCount]);

  // Reset hint count when moving to a new puzzle
  useEffect(() => {
    setHintCount(0);
    setInput("");
    setMessage("");
  }, [current]);

  const handleAnswer = (answer) => {
    if (answer.trim().toLowerCase() === puzzle.answer.trim().toLowerCase()) {
      setMessage("Correct! Moving to the next puzzle...");
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
      }, 1200);
    } else {
      setMessage("Incorrect, try again!");
    }
  };

  const handleInput = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAnswer(input);
  };

  const handleShowHint = () => setHintCount((c) => c + 1);

  // Add a restart button to clear progress
  const handleRestart = () => {
    localStorage.removeItem("escapeRoomCurrent");
    localStorage.removeItem("escapeRoomHintCount");
    setCurrent(0);
    setHintCount(0);
    setInput("");
    setMessage("");
  };

  if (current >= puzzles.length) {
    return (
      <div className="app-container">
        <h1>🎉 Congratulations! You escaped! 🎉</h1>
        <button onClick={handleRestart}>Restart</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Escape Room</h1>
      <div className="puzzle-box">
        {/* ... puzzle rendering as before ... */}
        {puzzle.type === "text" && <TextPuzzle question={puzzle.question} />}
        {puzzle.type === "image" && (
          <ImagePuzzle image={puzzle.image} question={puzzle.question} />
        )}
        {puzzle.type === "interactive" && (
          <InteractivePuzzle
            question={puzzle.question}
            onSolve={handleAnswer}
          />
        )}
        {puzzle.type !== "interactive" && (
          <form onSubmit={handleSubmit} className="answer-form">
            <input
              type="text"
              value={input}
              onChange={handleInput}
              placeholder="Your answer"
              autoFocus
            />
            <button type="submit">Submit</button>
          </form>
        )}
        {message && <div className="message">{message}</div>}
        <HintArea
          hints={puzzle.hints}
          revealedCount={hintCount}
          onShowHint={handleShowHint}
        />
      </div>
      <div className="progress">
        Puzzle {current + 1} of {puzzles.length}
      </div>
      <button onClick={handleRestart} style={{ marginTop: "1rem" }}>
        Restart
      </button>
    </div>
  );
}

export default App;
