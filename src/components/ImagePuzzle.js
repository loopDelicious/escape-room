import React, { useRef, useState, useEffect } from "react";

export default function ImagePuzzle({ image, question, audioSrc }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, inside: false });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const containerRef = useRef(null);

  // Check if this image should have the flashlight effect
  const shouldUseFlashlight = !image.includes("chalkboard.png");

  // Audio functionality
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1; // Set volume to 10%
      setIsAudioPlaying(false); // Start muted
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [audioSrc]);

  const handleAudioToggle = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play();
        setIsAudioPlaying(true);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!shouldUseFlashlight) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    });
  };

  const handleMouseLeave = () => {
    if (!shouldUseFlashlight) return;
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
      {audioSrc && (
        <audio ref={audioRef} src={audioSrc} preload="auto" />
      )}
      <div
        className={`flashlight-image-container ${!shouldUseFlashlight ? 'no-flashlight' : ''}`}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative' }}
      >
        <img src={image} alt="Puzzle" />
        {audioSrc && (
          <button 
            className="audio-toggle-btn"
            onClick={handleAudioToggle}
            title={isAudioPlaying ? "Mute audio" : "Play audio"}
          >
            {isAudioPlaying ? "🔊" : "🔇"}
          </button>
        )}
        {shouldUseFlashlight && (
          <div
            className={`flashlight-overlay ${mouse.inside ? "fast" : "slow"}`}
            style={{ background: gradient }}
          />
        )}
      </div>
      <p>{question}</p>
    </div>
  );
}
