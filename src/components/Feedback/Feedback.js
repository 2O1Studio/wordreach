import React, { useRef, useState } from "react";
import { logEvent } from "../../lib/analytics";
import { Button } from "../Button/Button";
import "./Feedback.scss";
const formData = [
  {
    label: "Did you enjoy playing Word Reach?",
    options: [
      "I'd play it once a day",
      "I'd love to binge play it",
      "Take it or leave it",
      "Not my cup o' tea",
    ],
  },
  {
    label: "How difficult did you find this game?",
    options: [
      "My 5 year old could do it",
      "I had to think about it",
      "It took longer than it should",
      "I had to ask for help",
    ],
  },
  {
    label: "Would you like to share your results with friends?",
    options: ["Yes", "No"],
  },
];

export const Feedback = () => {
  const form = useRef(null);
  const [selectedFormValues, setSelectedFormValues] = useState([
    null,
    null,
    null,
  ]);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const getResultValue = (questionNumber) => {
    return formData[questionNumber].options[selectedFormValues[questionNumber]];
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    logEvent("feedback", {
      enjoyability: getResultValue(0),
      difficulty: getResultValue(1),
      shareability: getResultValue(2),
    });
    setHasSubmitted(true);
  };

  if (hasSubmitted) {
    return <p>Thank you for sharing your feedback 😊</p>;
  }
  return (
    <form ref={form} onSubmit={handleOnSubmit}>
      {formData.map((question, q) => {
        return (
          <fieldset key={question.label}>
            <legend>{question.label}</legend>
            {question.options.map((option, i) => (
              <label key={option} style={{ display: "block" }}>
                <input
                  type="radio"
                  checked={selectedFormValues[q] === i}
                  onChange={(e) => {
                    setSelectedFormValues((f) =>
                      f.map((f, fi) => {
                        if (fi !== q) return f;
                        return i;
                      })
                    );
                  }}
                  name={encodeURIComponent(question.label)}
                />
                {option}
              </label>
            ))}
          </fieldset>
        );
      })}
      <Button
        disabled={selectedFormValues.some((i) => i === null)}
        isButton
        type="submit"
        center
      >
        Submit my feedback
      </Button>
    </form>
  );
};
