import React from "react";

export default function ImagePuzzle({ image, question }) {
  return (
    <div className="puzzle-content">
      <img src={image} alt="Puzzle" className="puzzle-image" />
      <p>{question}</p>
    </div>
  );
}
