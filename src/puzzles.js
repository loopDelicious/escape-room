// src/puzzles.js
const puzzles = [
  {
    id: 1,
    type: "text",
    question:
      "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "echo",
    hints: [
      "It's something you can hear but not see.",
      "It repeats what you say.",
      "It starts with the letter 'E'.",
    ],
  },
  {
    id: 2,
    type: "image",
    image: "/lock.png", // Place image in public/
    question: "Find the hidden number in the image.",
    answer: "42",
    hints: [
      "Look closely at the shadows.",
      "Try adjusting your screen brightness.",
      "The number is in the bottom right corner.",
    ],
  },
  {
    id: 3,
    type: "interactive",
    question: "Drag the key to the lock to unlock the next level.",
    answer: "unlocked",
    hints: [
      "Try dragging the key image.",
      "The lock is waiting for the key.",
      "Drop the key onto the lock.",
    ],
  },
];

export default puzzles;
