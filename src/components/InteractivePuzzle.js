import React, { useState, useEffect } from "react";

// Example card data (replace images with your own paths)
const CARD_DATA = [
  {
    id: 1,
    name: "Venus Flytrap",
    image: "/cards/venus.png",
    category: "flora",
  },
  {
    id: 2,
    name: "Blue Slime",
    image: "/cards/blueslime.png",
    category: "slime",
  },
  {
    id: 3,
    name: "Fire Beetle",
    image: "/cards/firebeetle.png",
    category: "critter",
  },
  { id: 4, name: "Glow Fern", image: "/cards/glowfern.png", category: "flora" },
  {
    id: 5,
    name: "Green Slime",
    image: "/cards/greenslime.png",
    category: "slime",
  },
  {
    id: 6,
    name: "Moon Moth",
    image: "/cards/moonmoth.png",
    category: "critter",
  },
  { id: 7, name: "Spore Cap", image: "/cards/sporecap.png", category: "flora" },
  {
    id: 8,
    name: "Helio Worm",
    image: "/cards/helioworm.png",
    category: "critter",
  },
  {
    id: 9,
    name: "Tunnel Rat",
    image: "/cards/tunnelrat.png",
    category: "critter",
  },
  {
    id: 10,
    name: "Star Orchid",
    image: "/cards/starorchid.png",
    category: "flora",
  },
];

const CHAMBERS = [
  { id: "flora", image: "/chambers/flora.png", alt: "Flora Chamber" },
  { id: "slime", image: "/chambers/slime.png", alt: "Slime Chamber" },
  { id: "critter", image: "/chambers/critter.png", alt: "Critter Chamber" },
];

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// Fisher-Yates shuffle
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function InteractivePuzzle({ onSolve, question }) {
  const [cards, setCards] = useState(
    shuffle(CARD_DATA).map((card) => ({
      ...card,
      revealed: false,
      sorted: false,
    }))
  );
  const [currentCard, setCurrentCard] = useState(null); // index of revealed card
  const [solvedCount, setSolvedCount] = useState(0);
  const [message, setMessage] = useState("");
  const [chamberHighlight, setChamberHighlight] = useState({}); // {chamberId: "none"|"correct"|"incorrect"}
  const [selectedCard, setSelectedCard] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up! Reset the puzzle
            setIsTimerActive(false);
            setCards(
              shuffle(CARD_DATA).map((card) => ({
                ...card,
                revealed: false,
                sorted: false,
              }))
            );
            setCurrentCard(null);
            setSelectedCard(null);
            setSolvedCount(0);
            setMessage("Time's up! All cards have been reset.");
            setChamberHighlight({});
            return 30; // Reset timer
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Reset timer when puzzle is solved
  useEffect(() => {
    if (solvedCount === cards.length) {
      setIsTimerActive(false);
    }
  }, [solvedCount, cards.length]);

  const handleCardTap = (idx) => {
    if (cards[idx].sorted) return;
    // Reveal the card if not already revealed
    if (!cards[idx].revealed) {
      setCards(cards.map((c, i) => (i === idx ? { ...c, revealed: true } : c)));
    }
    setSelectedCard(idx);
  };

  const handleChamberTap = (chamberId) => {
    if (selectedCard === null) return;
    handleDrop(chamberId, selectedCard);
    const idx = selectedCard;
    const card = cards[idx];
    if (!card || card.sorted || !card.revealed) return;

    if (card.category === chamberId) {
      // Correct!
      const newCards = cards.map((c, i) =>
        i === idx ? { ...c, sorted: true, revealed: true } : c
      );
      const newSolved = solvedCount + 1;
      setCards(newCards);
      setSelectedCard(null);
      setSolvedCount(newSolved);
      setMessage("Correct!");

      if (newSolved === cards.length) {
        setTimeout(() => {
          onSolve("unlocked");
        }, 800);
      }
    } else {
      // Incorrect! Reset all
      setMessage("Wrong chamber! All critters escape...");
      setTimeout(() => {
        setCards(cards.map((c) => ({ ...c, revealed: false, sorted: false })));
        setSelectedCard(null);
        setSolvedCount(0);
        setMessage("");
        // Reset timer on incorrect move
        setTimeLeft(30);
        setIsTimerActive(true);
      }, 1200);
    }
  };

  // Reveal a card
  const handleReveal = (idx) => {
    if (cards[idx].sorted || currentCard !== null) return; // can't reveal if already sorted or another card is active
    setCards(cards.map((c, i) => (i === idx ? { ...c, revealed: true } : c)));
    setCurrentCard(idx);
    setMessage("");
  };

  // Drag events
  const handleDragStart = (e, idx) => {
    e.dataTransfer.setData("cardIdx", idx);
  };

  const handleDrop = (chamberId) => (e) => {
    const idx = Number(e.dataTransfer.getData("cardIdx"));
    const card = cards[idx];
    if (!card || card.sorted || !card.revealed) return;

    if (card.category === chamberId) {
      // Correct!
      setChamberHighlight({ [chamberId]: "correct" });
      const newCards = cards.map((c, i) =>
        i === idx ? { ...c, sorted: true, revealed: true } : c
      );
      const newSolved = solvedCount + 1;
      setCards(newCards);
      setCurrentCard(null);
      setSolvedCount(newSolved);
      setMessage("");

      setTimeout(() => setChamberHighlight({}), 700);

      if (newSolved === cards.length) {
        setTimeout(() => {
          onSolve("unlocked");
        }, 800);
      }
    } else {
      // Incorrect! Reset all, shuffle
      setChamberHighlight({ [chamberId]: "incorrect" });
      setMessage("Wrong chamber! All critters escape...");
      setTimeout(() => {
        setCards(
          shuffle(cards.map((c) => ({ ...c, revealed: false, sorted: false })))
        );
        setCurrentCard(null);
        setSolvedCount(0);
        setMessage("");
        setChamberHighlight({});
        // Reset timer on incorrect move
        setTimeLeft(30);
        setIsTimerActive(true);
      }, 1200);
    }
  };

  // Drag over handler to allow drop
  const handleDragOver = (chamberId) => (e) => {
    e.preventDefault();
    setChamberHighlight({ [chamberId]: "hover" });
  };

  // Remove highlight on drag leave
  const handleDragLeave = () => {
    setChamberHighlight({});
  };

  return (
    <div className="puzzle-content">
      <p>{question}</p>
      <div className="timer">
        <span className={`timer-text ${timeLeft <= 10 ? "timer-warning" : ""}`}>
          Time remaining: {timeLeft}s
        </span>
      </div>
      <div className="card-grid">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={`card-3d ${
              card.revealed || card.sorted ? "flipped" : ""
            } ${card.sorted ? "sorted" : ""} ${
              selectedCard === idx ? "selected" : ""
            }`}
            onClick={
              isTouchDevice
                ? () => handleCardTap(idx) // tap-to-select
                : () => handleReveal(idx) // desktop: reveal on click
            }
            draggable={
              !isTouchDevice &&
              card.revealed &&
              !card.sorted &&
              currentCard === idx
            }
            onDragStart={
              !isTouchDevice &&
              card.revealed &&
              !card.sorted &&
              currentCard === idx
                ? (e) => handleDragStart(e, idx)
                : undefined
            }
            style={{
              cursor: card.sorted
                ? "default"
                : card.revealed
                ? isTouchDevice
                  ? "pointer"
                  : "grab"
                : "pointer",
              opacity: card.sorted ? 0.5 : 1,
            }}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-back" />
              </div>
              <div className="card-back-face">
                <img
                  src={card.image}
                  alt=""
                  className="card-img"
                  title={card.name}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chambers">
        {CHAMBERS.map((chamber) => (
          <div
            key={chamber.id}
            className={`chamber chamber-img
          ${chamberHighlight[chamber.id] === "hover" ? "chamber-hover" : ""}
          ${chamberHighlight[chamber.id] === "correct" ? "chamber-correct" : ""}
          ${
            chamberHighlight[chamber.id] === "incorrect"
              ? "chamber-incorrect"
              : ""
          }
        `}
            onClick={
              isTouchDevice
                ? () => handleChamberTap(chamber.id) // tap-to-drop
                : undefined
            }
            onDrop={!isTouchDevice ? handleDrop(chamber.id) : undefined}
            onDragOver={!isTouchDevice ? handleDragOver(chamber.id) : undefined}
            onDragLeave={!isTouchDevice ? handleDragLeave : undefined}
          >
            <img
              src={chamber.image}
              alt={chamber.alt}
              className="chamber-icon"
            />
          </div>
        ))}
      </div>
      {message && <div className="message">{message}</div>}
      <div className="sort-progress">
        Sorted: {solvedCount} / {cards.length}
      </div>
    </div>
  );
}
