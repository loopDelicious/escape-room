import React, { useState, useEffect } from "react";
import HintArea from "./components/HintArea";
import LandingPage from "./LandingPage";
import puzzles from "./data/futuraPuzzles";
import IntroPuzzle from "./components/IntroPuzzle";
import TextPuzzle from "./components/TextPuzzle";
import ImagePuzzle from "./components/ImagePuzzle";
import InteractivePuzzle from "./components/InteractivePuzzle";
import BridgePuzzle from "./components/BridgePuzzle";
import FuturaSuccess from "./components/FuturaSuccess";
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
  const [selectedRoom, setSelectedRoom] = useState("futura");

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
  const [fade, setFade] = useState(false);

  const puzzle = puzzles[current];
  const isFuturaRoom = page === "puzzle" && selectedRoom === "futura";

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

  // When moving to a new puzzle, restore hint count to 0 and reset input/message
  useEffect(() => {
    setHintCount(0);
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
    localStorage.removeItem("bridge-found-4");
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
    if (puzzle.type === "intro") {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
        setFade(false);
        setMessage("");
      }, 800);
      return;
    }
    if (puzzle.type === "text") {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
        setFade(false);
        setMessage("");
      }, 800);
      return;
    }
    // Only check answer for single-answer puzzles
    if (
      typeof answer === "string" &&
      puzzle.answer &&
      puzzle.type !== "bridge"
    ) {
      if (
        (answer || "").trim().toLowerCase() ===
        (puzzle.answer || "").trim().toLowerCase()
      ) {
        setMessage("Correct! Moving to the next puzzle...");
        setFade(true);
        setTimeout(() => {
          setCurrent((prev) => prev + 1);
          setFade(false);
          setMessage("");
        }, 800);
      } else {
        setMessage("Incorrect, try again!");
      }
      return;
    }
    // Fallback: if called with no argument (from BridgePuzzle), advance
    if (answer === undefined && puzzle.type === "bridge") {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
        setFade(false);
        setMessage("");
      }, 800);
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
    return (
      <div className="app-container general">
        <LandingPage onStart={handleStart} />
      </div>
    );
  }

  // If finished all puzzles
  if (current >= puzzles.length) {
    return (
      <FuturaSuccess
        isFuturaRoom={isFuturaRoom}
        handleRestart={handleRestart}
      />
    );
  }

  // Puzzle page
  return (
    <div
      className={`puzzle-box${
        puzzle.type === "bridge" ? " bridge-puzzle-box" : ""
      }${fade ? " fade-out" : ""}`}
    >
      {puzzle.type === "intro" && (
        <IntroPuzzle puzzle={puzzle} onSolve={handleAnswer} />
      )}
      {puzzle.type === "text" && (
        <TextPuzzle questions={puzzle.questions} onSolve={handleAnswer} />
      )}
      {puzzle.type === "image" && (
        <>
          <ImagePuzzle image={puzzle.image} question={puzzle.question} />
          {puzzle.answer && (
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
        </>
      )}
      {puzzle.type === "interactive" && (
        <InteractivePuzzle question={puzzle.question} onSolve={handleAnswer} />
      )}
      {puzzle.type === "bridge" && (
        <BridgePuzzle puzzle={puzzle} onSolve={handleAnswer} />
      )}
      {/* Only show the generic answer form for puzzles that are not handled above */}
      {!["intro", "text", "image", "interactive", "bridge"].includes(
        puzzle.type
      ) &&
        puzzle.answer && (
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
      <div className="progress">
        Puzzle {current + 1} of {puzzles.length}
      </div>
      <div className="sci-fi-buttons">
        {current > 0 && (
          <button
            className="sci-fi-btn sci-fi-btn-secondary"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <button
          className="sci-fi-btn sci-fi-btn-secondary"
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;
