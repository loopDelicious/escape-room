// src/puzzles.js
const puzzles = [
  {
    id: 1,
    type: "text",
    questions: [
      {
        letter: "S",
        answer: "shadow",
        riddle:
          "I follow you everywhere in space, but I vanish when you enter light. I grow longer when the sun is low, shorter when it's high. On this station, I dance on the walls but never make a sound. I am always with you, yet I have no substance. What am I?",
      },
      {
        letter: "P",
        answer: "planet",
        riddle:
          "I am a wanderer that never loses its way, bound by invisible chains to my master of fire. I dance around my star in an eternal waltz, taking the same path my ancestors carved. I am round but was not always so - time and gravity sculpted my form. Some of my siblings harbor life, others are barren wastelands. What am I?",
      },
      {
        letter: "A",
        answer: "asteroid",
        riddle:
          "I am a mountain that flies through the void, a leftover crumb from creation's ancient feast. I have ended worlds and begun new chapters in the story of life. Most of my kind sleep peacefully in the space between worlds, but some of us go wandering. I carry the secrets of how your system was born. What am I?",
      },
      {
        letter: "C",
        answer: "comet",
        riddle:
          "I am a dirty snowball that grows a magnificent tail when I approach the fire of stars. I visit your neighborhood once in a lifetime, maybe twice if you're lucky. I have been called both harbinger of doom and herald of wonder. Ancient peoples feared my arrival, modern ones celebrate it. My tail always points away from the sun, no matter which direction I travel. What am I?",
      },
      {
        letter: "E",
        answer: "echo",
        riddle:
          "I am the ghost of sound in empty corridors, the shadow of voices long silenced. I repeat your words but add my own loneliness to them. In the vacuum of space, I cannot exist - I need walls and air to live. On this station, I am trapped in the metal halls, bouncing endlessly until I fade. What am I?",
      },
    ],
    hints: [
      "The first letter of each answer forms a word.",
      "The word is related to the theme of the riddles.",
      "After all riddles, enter the word to proceed.",
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
