import React from "react";
import GridOverlay from "./components/GridOverlay"; // Adjust path if needed

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-container">
      <h1>Welcome to Escape Room!</h1>
      <p>Choose a room to begin your adventure. More rooms coming soon!</p>
      <div className="room-list">
        <div className="room-card sci-fi-room-card">
          {/* Grid overlay only inside this card */}
          <div className="card-grid-overlay">
            <GridOverlay />
          </div>
          <div className="sci-fi-room-card-content">
            <h2>Futura</h2>
            <p>The crew vanished. Their secrets remain. Can you survive?</p>
            <button
              className="sci-fi-btn sci-fi-btn-secondary"
              onClick={onStart}
            >
              Start
            </button>
          </div>
        </div>
        {/* Future rooms can be added here */}
      </div>
    </div>
  );
}
