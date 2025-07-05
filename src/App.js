import React, { useState, useEffect } from "react";
import puzzles from "./puzzles";
import TextPuzzle from "./components/TextPuzzle";
import ImagePuzzle from "./components/ImagePuzzle";
import InteractivePuzzle from "./components/InteractivePuzzle";
import HintArea from "./components/HintArea";
import LandingPage from "./LandingPage";
import "./App.css";

// Helper to get/set hint counts per puzzle in localStorage
const getHintCounts = () => {
  const saved = localStorage.getItem("escapeRoomHintCounts");
  return saved ? JSON.parse(saved) : {};
};
const setHintCounts = (counts) => {
  localStorage.setItem("escapeRoomHintCounts", JSON.stringify(counts));
};

function App() {
  // "landing" or "puzzle"
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("escapeRoomPage");
    return saved || "landing";
  });

  // For future expansion
  const [selectedRoom, setSelectedRoom] = useState("mystery");

  // Load progress from localStorage or default to 0
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem("escapeRoomCurrent");
    return saved ? Number(saved) : 0;
  });

  // Load hint count for current puzzle from localStorage
  const [hintCount, setHintCount] = useState(() => {
    const counts = getHintCounts();
    return counts[current] || 0;
  });

  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const puzzle = puzzles[current];

  // Save progress to localStorage whenever current or hintCount changes
  useEffect(() => {
    localStorage.setItem("escapeRoomCurrent", current);
    localStorage.setItem("escapeRoomPage", page);
  }, [current, page]);

  // Save hint counts per puzzle
  useEffect(() => {
    const counts = getHintCounts();
    counts[current] = hintCount;
    setHintCounts(counts);
  }, [hintCount, current]);

  // When moving to a new puzzle, restore hint count for that puzzle
  useEffect(() => {
    const counts = getHintCounts();
    setHintCount(counts[current] || 0);
    setInput("");
    setMessage("");
  }, [current]);

  // Start the room (from landing page)
  const handleStart = () => {
    setPage("puzzle");
    localStorage.setItem("escapeRoomPage", "puzzle");
  };

  // Go back to landing page and reset progress
  const handleRestart = () => {
    localStorage.removeItem("escapeRoomCurrent");
    localStorage.removeItem("escapeRoomHintCounts");
    localStorage.setItem("escapeRoomPage", "landing");
    setCurrent(0);
    setHintCount(0);
    setInput("");
    setMessage("");
    setPage("landing");
  };

  // Go to previous puzzle
  const handleBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

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

  // If on landing page
  if (page === "landing") {
    return <LandingPage onStart={handleStart} />;
  }

  // If finished all puzzles
  if (current >= puzzles.length) {
    return (
      <div className="app-container">
        <h1>🎉 Congratulations! You escaped! 🎉</h1>
        <button onClick={handleRestart}>Back to Home</button>
      </div>
    );
  }

  // Puzzle page
  return (
    <div className="app-container">
      <h1>Mystery Room</h1>
      <div className="puzzle-box">
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
      <div style={{ marginTop: "1rem" }}>
        {current > 0 && (
          <button onClick={handleBack} style={{ marginRight: "1rem" }}>
            Back
          </button>
        )}
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

export default App;
