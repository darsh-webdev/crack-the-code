import { useState } from "react";
import "./App.css";

const questions = [
  {
    id: 1,
    question: "What is the capital of Haryana?",
    options: ["Yamunanagar", "Panipat", "Gurgaon", "Chandigarh"],
    answer: "Chandigarh",
  },
  {
    id: 2,
    question: "What is the capital of Punjab?",
    options: ["Patiala", "Ludhiana", "Amritsar", "Chandigarh"],
    answer: "Chandigarh",
  },
  {
    id: 3,
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "Delhi",
  },
  {
    id: 4,
    question: "What is the capital of Uttarakhand?",
    options: ["Roorkee", "Haridwar", "Dehradun", "Nanital"],
    answer: "Dehradun",
  },
  {
    id: 5,
    question: "What is capital of Uttar Pradesh?",
    options: ["GB Nagar", "Lucknow", "Prayagraj", "Agra"],
    answer: "Lucknow",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [warning, setWarning] = useState("");

  const getOptionTestId = (index: number) => {
    return `option-${String.fromCharCode(65 + index)}`; // A, B, C, D
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsQuizOver(false);
    setSelectedOption("");
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    setWarning("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption === "") {
      setWarning("Please select an option before submitting.");
      return; // No option selected
    }

    if (selectedOption === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption("");
    } else {
      setIsQuizOver(true);
    }
  };

  return (
    <div className="App">
      <h1 className="app-title">Quiz App</h1>
      {!isQuizOver ? (
        <form className="question-container" onSubmit={handleSubmit}>
          <h3>Question {currentIndex + 1}</h3>
          <p className="question" data-testid="question">
            {questions[currentIndex].question}
          </p>
          <div className="options">
            {questions[currentIndex].options.map((opt, idx) => (
              <label key={idx} className="option">
                <input
                  type="radio"
                  name="option"
                  data-testid={getOptionTestId(idx)}
                  value={opt}
                  onChange={handleOptionChange}
                  checked={selectedOption === opt}
                />
                <span data-testid={getOptionTestId(idx)}>{opt}</span>
              </label>
            ))}
          </div>
          {warning && (
            <p className="warning" data-testid="warning">
              {warning}
            </p>
          )}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="score-container">
          <h2 data-testid="score">
            Your Score: {score} / {questions.length}
          </h2>
          <button
            className="restart-button"
            data-testid="restart-button"
            onClick={handleReset}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
