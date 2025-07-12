import React, { useState, useEffect } from "react";
import HintArea from "../../../components/HintArea";
import IntroPuzzle from "../../../components/IntroPuzzle";
import TextPuzzle from "../../../components/TextPuzzle";
import ImagePuzzle from "../../../components/ImagePuzzle";
import InteractivePuzzle from "../../../components/InteractivePuzzle";
import BridgePuzzle from "../../../components/BridgePuzzle";
import FuturaSuccess from "./FuturaSuccess";
import puzzles from "../data/futuraPuzzles";
import "../styles/futura.css";

// Helper to get/set hint counts per puzzle in localStorage
const getHintCounts = () => {
  const saved = localStorage.getItem("escapeRoomHintCounts");
  return saved ? JSON.parse(saved) : {};
};
const setHintCounts = (counts) => {
  localStorage.setItem("escapeRoomHintCounts", JSON.stringify(counts));
};

export default function FuturaPuzzleManager({ onRestart }) {
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

  // Save progress to localStorage whenever current or hintCount changes
  useEffect(() => {
    localStorage.setItem("escapeRoomCurrent", current);
  }, [current]);

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

  // If finished all puzzles
  if (current >= puzzles.length) {
    return (
      <FuturaSuccess
        isFuturaRoom={true}
        handleRestart={onRestart}
      />
    );
  }

  // Puzzle page
  return (
    <div className="app-container sci-fi">
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
            onClick={onRestart}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
} 