import React, { useRef, useEffect } from "react";

export default function GridOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let offset = 0;

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(0,255,255,0.08)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      offset += 0.3;

      for (let x = -gridSize + (offset % gridSize); x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -gridSize + (offset % gridSize); y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.7,
        transition: "opacity 0.5s",
      }}
      aria-hidden="true"
    />
  );
}
