import React, { useState } from "react";
import LandingPage from "./LandingPage";
import FuturaPuzzleManager from "./puzzles/futura/components/FuturaPuzzleManager";
import "./App.css";

function App() {
  // "landing" or "puzzle"
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("escapeRoomPage");
    return saved || "landing";
  });

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
    setPage("landing");
  };

  // If on landing page
  if (page === "landing") {
    return (
      <div className="app-container general">
        <LandingPage onStart={handleStart} />
      </div>
    );
  }

  // Puzzle page - use Futura puzzle manager
  return <FuturaPuzzleManager onRestart={handleRestart} />;
}

export default App;
