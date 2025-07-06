import React, { useRef, useState } from "react";

export default function ImagePuzzle({ image, question }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, inside: false });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    });
  };

  const handleMouseLeave = () => {
    setMouse((m) => ({ ...m, inside: false }));
  };

  // Flashlight size and softness
  const radius = 35; // main visible area
  const glow = 40; // soft edge width
  const overlayOpacity = 0.9; // 0 = transparent, 1 = fully black

  // The gradient will have:
  // 0% - fully transparent (center)
  // 70% - transparent (main area)
  // 85% - soft glow (partially transparent)
  // 100% - fully dark (overlayOpacity)
  const gradient = mouse.inside
    ? `radial-gradient(
        circle ${radius + glow}px at ${mouse.x}px ${mouse.y}px,
        rgba(0,255,255,0.10) 0%,
        rgba(0,255,255,0.05) 60%,
        rgba(0,255,255,0.10) 70%,
        rgba(10,20,40,0.5) 85%,
        rgba(10,20,40,${overlayOpacity}) 100%
      )`
    : `rgba(10,20,40,${overlayOpacity})`;

  return (
    <div className="puzzle-content">
      <div
        className="flashlight-image-container"
        ref={containerRef}
        style={{ position: "relative", display: "inline-block" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={image}
          alt="Puzzle"
          className="puzzle-image"
          style={{ display: "block" }}
        />
        <div
          className="flashlight-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            background: gradient,
            transition: mouse.inside ? "background 0.1s" : "background 0.3s",
            borderRadius: "10px",
          }}
        />
      </div>
      <p>{question}</p>
    </div>
  );
}
