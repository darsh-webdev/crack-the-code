/*
Problem Statement: Create a React component that displays a list of frequently
asked questions. Each question can be expanded or collapsed individually, revealing
the corresponding answer. Only one question can be open at a time. The component uses
icons to indicate the expanded or collapsed state of each question.
 */

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./App.css";

const faqs = [
  {
    question: "What is this app about?",
    answer: "This app helps users track and improve their daily habits.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login screen and follow instructions.",
  },
  {
    question: "Can I use this app offline?",
    answer: "Yes, some features are available offline after the initial setup.",
  },
];

function App() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div className="faq-item" data-testid={`faq-item-${index}`} key={index}>
          <button className="faq-question" onClick={() => handleToggle(index)}>
            <span data-testid={`faq-question-${index}`}>{faq.question}</span>
            <span className="faq-icon">
              {openIndex === index ? (
                <FiChevronUp data-testid={`icon-up-${index}`} />
              ) : (
                <FiChevronDown data-testid={`icon-down-${index}`} />
              )}
            </span>
          </button>
          {openIndex === index && (
            <div className="faq-answer" data-testid={`faq-answer-${index}`}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
