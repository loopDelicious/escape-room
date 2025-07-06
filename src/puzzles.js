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
    image: "/lab.png", // Place image in public/
    question:
      "It looks like Dr. Chien left her laboratory in a hurry. Find the values from her research and combine them to unlock the emergency containment protocol.",
    answer: "42",
    hints: [
      "Look closely at the shadows.",
      "Try adjusting your screen brightness.",
      "Find 3 values on the glass.",
    ],
  },
  {
    id: 3,
    type: "interactive",
    question:
      "Some of the specimens have escaped! Help catch them to unlock the next level.",
    answer: "unlocked",
    hints: ["Try dragging a specimen to the correct chamber."],
  },
];

export default puzzles;
