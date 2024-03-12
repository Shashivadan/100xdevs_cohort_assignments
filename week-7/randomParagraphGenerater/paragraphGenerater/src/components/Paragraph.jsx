import React from "react";
import { useRef } from "react";
import { useState } from "react";

function Paragraph() {
  const [paragraph, setParaGraph] = useState("");
  const useWordRef = useRef(0);

  const paragraphGenerater = (words) => {
    let string = "";
    const randomWords = [
      "serendipity",
      "quixotic",
      "ephemeral",
      "luminous",
      "resplendent",
      "effervescent",
      "mellifluous",
      "ambrosial",
      "incandescent",
      "eloquent",
      "ethereal",
      "sonorous",
      "verdant",
      "tranquil",
      "halcyon",
      "idyllic",
      "gossamer",
      "petrichor",
      "susurrus",
      "bucolic",
      "the",
      "and",
      "is",
      "in",
      "it",
      "you",
      "that",
      "was",
      "for",
      "are",
      "with",
      "his",
      "they",
      "be",
      "at",
      "one",
      "have",
      "this",
      "from",
      "or",
      "had",
      "by",
      "not",
      "word",
      "but",
      "what",
      "some",
      "we",
      "can",
      "out",
      "other",
      "were",
      "all",
      "there",
      "when",
      "up",
      "use",
      "your",
      "how",
      "said",
      "an",
      "each",
      "she",
      "which",
      "do",
      "their",
      "time",
      "if",
      "will",
      "way",
      "about",
      "many",
      "then",
      "them",
      "write",
      "would",
      "like",
      "so",
      "these",
      "her",
      "long",
      "make",
      "thing",
      "see",
      "him",
      "two",
      "has",
      "look",
      "more",
      "day",
      "could",
      "go",
      "come",
      "did",
      "number",
      "sound",
      "no",
      "most",
      "people",
      "my",
      "over",
      "know",
      "water",
      "than",
    ];
    for (let i = 0; i <= words; i++) {
      const randomInt = Math.floor(Math.random() * randomWords.length) + 1;
      string += " " + randomWords[randomInt];
    }
    setParaGraph(string);
  };
  return (
    <div>
      <label htmlFor="text"></label>
      <input type="text" ref={useWordRef} />
      <button
        onClick={() => {
          paragraphGenerater(Number(useWordRef.current.value));
        }}
      >
        Generate
      </button>
      <p>{paragraph}</p>
    </div>
  );
}

export default Paragraph;
