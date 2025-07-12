import React from "react";
import GridOverlay from "../../../components/GridOverlay";

export default function FuturaSuccess({ isFuturaRoom, handleRestart }) {
  return (
    <div
      className={
        isFuturaRoom ? "app-container sci-fi" : "app-container general"
      }
    >
      {isFuturaRoom && <GridOverlay />}
      <div className="progress">
        <h1 className="final-futura-success">👾 You did it! 👾</h1>
        <video
          src="/success.mp4"
          controls
          style={{
            width: "50%",
            display: "block",
            borderRadius: "12px",
            margin: "2rem 0",
          }}
        >
          Your browser does not support the video tag.
        </video>
        <p>
          Thanks for playing! More puzzles are on the way. Want to support
          future builds?
        </p>
        <p align="left">
          <a href="https://coff.ee/joycejetson">
            <img src="/bmc-button.png" width="150" alt="Buy Me a Coffee" />
          </a>
        </p>
        <button
          className="sci-fi-btn sci-fi-btn-secondary"
          onClick={handleRestart}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
