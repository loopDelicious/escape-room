import React from "react";
import GridOverlay from "./components/GridOverlay";
import rooms from "./data/rooms";

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-container">
      <h1>Welcome to Escape Room!</h1>
      <p>Choose a room to begin your adventure. More rooms coming soon!</p>
      <div className="room-list">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`room-card ${room.className || ""}`}
          >
            {room.skin === "grid" && (
              <div className="card-grid-overlay">
                <GridOverlay />
              </div>
            )}
            <div
              className={`${room.className ? room.className + "-content" : ""}`}
            >
              <h2>{room.name}</h2>
              <p>{room.description}</p>
              <button
                className="sci-fi-btn sci-fi-btn-secondary"
                onClick={() => onStart(room.id)}
              >
                Start
              </button>
            </div>
            {room.difficulty && (
              <span className="difficulty-label">{room.difficulty}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
