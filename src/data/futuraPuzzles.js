const puzzles = [
  {
    id: 0,
    type: "intro",
    title: "Welcome to Futura",
    description:
      "The crew of the Futura vanished without a trace. Their secrets remain locked in the ship's systems. Can you solve the puzzles and uncover the truth?",
    image: "/spaceship.png",
    className: "futura-intro-content",
    hints: [
      "Explore the ship's systems carefully.",
      "Pay attention to the clues left behind.",
      "Work together to solve the puzzles.",
    ],
  },
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
    image: "/lab.png",
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
  {
    id: 4,
    type: "bridge",
    question:
      "The bridge is in disarray. The crew left in a hurry, and the navigation console is damaged. Find the clues to restore communication and navigate the ship.",
    answer: "find the main escape route",
    title: "The Bridge",
    background: "/bridge.png",
    hotspots: [
      {
        id: "warning-light",
        x: 250,
        y: 550,
        width: 32,
        height: 32,
        icon: "/clues/warning-light.gif",
        clue: {
          title: "Radiation Warning",
          text: "Radiation levels are elevated near the reactor core. Oxygen reserves are running dangerously low. Under the damaged console, There's white powder residue from Electrical burns.",
          image: "/clues/warning-light.gif",
        },
      },
      {
        id: "rodent",
        x: 250,
        y: 70,
        width: 50,
        height: 50,
        icon: "/cards/tunnelrat.png",
        clue: {
          title: "Tunnel Rat",
          text: "Tunnel rats got loose from containment. Hull breach detected in section Eleven.",
          image: "/cards/tunnelrat.png",
        },
      },
      {
        id: "communication-panel",
        x: 600,
        y: 490,
        width: 30,
        height: 30,
        rotate: -10,
        icon: "/clues/communication-panel.png",
        clue: {
          title: "Communication Panel",
          text: "Emergency protocols are active. Something is wrong with the Communication Array. Power grid unstable. Evacuation pods missing.",
          image: "/clues/communication-panel.png",
        },
      },
      {
        id: "wires",
        x: 500,
        y: 538,
        width: 50,
        height: 20,
        icon: "",
        hidden: true,
        clue: {
          title: "Navigation Console",
          text: "Futura needs your help. It is imperative that you fix the Navigation panel before the Destruction sequence begins.",
          image: "/clues/frayed-wires.png",
        },
      },
      {
        id: "dust",
        x: 700,
        y: 655,
        width: 50,
        height: 50,
        icon: "/clues/white-powder.png",
        clue: {
          title: "White Powder",
          text: "Mayday signal is broadcasting on All frequencies. In the event of system failure, check the backup generator. Navigation systems are completely offline.",
          image: "/clues/white-powder.png",
        },
      },
      {
        id: "red-herring-communication-panel",
        x: 450,
        y: 490,
        width: 32,
        height: 32,
        icon: "/clues/communication-panel.png",
        disabled: true,
        clue: {
          title: "Red Herring 1",
          text: "",
          image: "",
        },
      },
      {
        id: "monitor-1",
        x: 483,
        y: 465,
        width: 60,
        height: 60,
        icon: "/clues/monitor1.png",
        disabled: true,
        clue: {
          title: "Monitor 1",
          text: "Nothing to see here.",
          image: "",
        },
      },
      {
        id: "monitor-2",
        x: 537,
        y: 465,
        width: 60,
        height: 60,
        icon: "/clues/monitor2.png",
        disabled: true,
        clue: {
          title: "Monitor 2",
          text: "This monitor is displaying static. It might be broken.",
          image: "",
        },
      },
      {
        id: "crumpled-paper",
        x: 237,
        y: 620,
        width: 60,
        height: 60,
        icon: "/clues/crumpled-paper.png",
        disabled: true,
        clue: {
          title: "Crumpled Paper",
          text: "This is just a crumpled piece of paper. It doesn't seem important.",
          image: "",
        },
      },
      {
        id: "fire-extinguisher",
        x: -150,
        y: 520,
        width: 250,
        height: 250,
        icon: "/clues/fire-extinguisher.png",
        disabled: true,
        clue: {
          title: "Fire Extinguisher",
          text: "The fire extinguisher looks empty. It won't be of any use.",
          image: "",
        },
      },
    ],
    hints: [
      "Look for anything that stands out on the bridge.",
      "Some clues are hidden in plain sight.",
      "You must find all clues to proceed.",
    ],
  },
];

export default puzzles;
