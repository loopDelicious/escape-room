import React, { useState, useEffect } from "react";

export default function BridgePuzzle({ puzzle, onSolve }) {
  const storageKey = `bridge-found-${puzzle.id}`;
  const [found, setFound] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [openClue, setOpenClue] = useState(null);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  // Persist found clues
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(found));
  }, [found, storageKey]);

  // Optionally, clear found clues if puzzle.id changes (e.g., on restart)
  useEffect(() => {
    setFound(() => {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    });
  }, [puzzle.id, storageKey]);

  const handleHotspotClick = (id) => {
    setOpenClue(id);
    if (!found.includes(id)) {
      setFound([...found, id]);
    }
  };

  const handleClose = () => setOpenClue(null);

  const canAnswer = found.length >= 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (input || "").trim().toLowerCase() ===
      (puzzle.answer || "").trim().toLowerCase()
    ) {
      setMessage("Correct! Proceeding...");
      setTimeout(() => {
        onSolve && onSolve();
        // Optionally clear found clues after solving
        localStorage.removeItem(storageKey);
      }, 1000);
    } else {
      setMessage("Incorrect, try again!");
    }
  };

  return (
    <div
      className="bridge-puzzle"
      style={{ position: "relative", width: "100%", height: "auto" }}
    >
      <img src={puzzle.background} alt="bridge" className="bridge-image" />
      {puzzle.hotspots.map((hs) => (
        <button
          key={hs.id}
          className={`hotspot-btn${found.includes(hs.id) ? " found" : ""}${
            hs.hidden ? " hotspot-hidden" : ""
          }${hs.disabled ? " hotspot-disabled" : ""}`}
          style={{
            left: hs.x,
            top: hs.y,
            width: hs.width,
            height: hs.height,
          }}
          onClick={hs.disabled ? undefined : () => handleHotspotClick(hs.id)}
          aria-label={hs.clue.title}
          tabIndex={hs.disabled ? -1 : 0}
          disabled={hs.disabled}
        >
          {hs.icon && (
            <img
              src={hs.icon}
              alt={hs.clue.title}
              className="hotspot-icon"
              style={
                hs.rotate ? { transform: `rotate(${hs.rotate}deg)` } : undefined
              }
            />
          )}
        </button>
      ))}
      {openClue && (
        <div className="clue-modal">
          <div className="clue-content">
            <h2>{puzzle.hotspots.find((h) => h.id === openClue).clue.title}</h2>
            {puzzle.hotspots.find((h) => h.id === openClue).clue.image && (
              <img
                src={puzzle.hotspots.find((h) => h.id === openClue).clue.image}
                alt=""
              />
            )}
            <p>{puzzle.hotspots.find((h) => h.id === openClue).clue.text}</p>
            <button className="sci-fi-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
      {canAnswer && (
        <form
          onSubmit={handleSubmit}
          className="answer-form"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the answer"
            autoFocus
          />
          <button
            type="submit"
            className="sci-fi-btn"
            style={{ marginLeft: "1rem" }}
          >
            Submit
          </button>
          {message && (
            <div className="message" style={{ marginTop: "1rem" }}>
              {message}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
