import React, { useState } from "react";

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

// Chamber images (replace with your own abstract icons)
const CHAMBERS = [
  { id: "flora", image: "/chambers/flora.png", alt: "Flora Chamber" },
  { id: "slime", image: "/chambers/slime.png", alt: "Slime Chamber" },
  { id: "critter", image: "/chambers/critter.png", alt: "Critter Chamber" },
];

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
      setMessage("Correct!");

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
      <div className="card-grid">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={`card-3d ${
              card.revealed || card.sorted ? "flipped" : ""
            } ${card.sorted ? "sorted" : ""}`}
            onClick={() => handleReveal(idx)}
            draggable={card.revealed && !card.sorted && currentCard === idx}
            onDragStart={
              card.revealed && !card.sorted && currentCard === idx
                ? (e) => handleDragStart(e, idx)
                : undefined
            }
            style={{
              cursor: card.sorted
                ? "default"
                : card.revealed
                ? "grab"
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
                  title={card.name} // Native tooltip
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
              ${
                chamberHighlight[chamber.id] === "correct"
                  ? "chamber-correct"
                  : ""
              }
              ${
                chamberHighlight[chamber.id] === "incorrect"
                  ? "chamber-incorrect"
                  : ""
              }
            `}
            onDrop={handleDrop(chamber.id)}
            onDragOver={handleDragOver(chamber.id)}
            onDragLeave={handleDragLeave}
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
