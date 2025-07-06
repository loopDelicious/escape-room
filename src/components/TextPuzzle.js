import React, { useState } from "react";

export default function TextPuzzle({ questions, onSolve }) {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [finalInput, setFinalInput] = useState("");
  const [finalMessage, setFinalMessage] = useState("");

  if (!Array.isArray(questions) || questions.length === 0) {
    return <div className="text-puzzle">No riddles found for this puzzle.</div>;
  }

  // Handle each riddle answer
  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = questions[current].answer.trim().toLowerCase();
    if (input.trim().toLowerCase() === answer) {
      setInput("");
      setMessage("");
      setCurrent(current + 1); // Move to next riddle or to final word
    } else {
      setMessage("Incorrect, try again!");
    }
  };

  // Handle the final acrostic word
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const acrostic = questions
      .map((q) => q.letter)
      .join("")
      .toLowerCase();
    console.log("Final input:", finalInput, "Acrostic:", acrostic);
    if ((finalInput || "").trim().toLowerCase() === acrostic) {
      setFinalMessage("Correct! Proceeding to the next level...");
      setTimeout(() => {
        onSolve && onSolve();
      }, 1200);
    } else {
      setFinalMessage("That's not the word. Try again!");
    }
  };

  // If there are riddles left, show the riddle-answer form
  if (current < questions.length) {
    return (
      <div className="text-puzzle">
        <div className="riddle-number">
          Riddle {current + 1} of {questions.length}
        </div>
        <div className="riddle-question">{questions[current].riddle}</div>
        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your answer"
            autoFocus
          />
          <button type="submit">Submit</button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    );
  }

  // Otherwise, show the final word form
  return (
    <div className="text-puzzle">
      <p>
        <strong>Well done!</strong> The first letter of each answer forms a
        word. What is it?
      </p>
      <form onSubmit={handleFinalSubmit} className="answer-form">
        <input
          type="text"
          value={finalInput}
          onChange={(e) => setFinalInput(e.target.value)}
          placeholder="Enter the word"
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
      {finalMessage && <div className="message">{finalMessage}</div>}
    </div>
  );
}
