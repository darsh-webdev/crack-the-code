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
  const getOptionTestId = (index: number) => {
    return `option-${String.fromCharCode(65 + index)}`; // A, B, C, D
  };

  return (
    <div className="App">
      <h1 className="app-title">Quiz App</h1>
      <form className="question-container">
        <h3>Question 1</h3>
        <p className="question" data-testid="question">
          {questions[1].question}
        </p>
        <div className="options">
          {questions[1].options.map((opt, idx) => (
            <label key={idx} className="option">
              <input type="radio" name="option" value={opt} />
              <span data-testid={getOptionTestId(idx)}>{opt}</span>
            </label>
          ))}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className="score-container">
        <h2 data-testid="score">Your Score: 0 / {questions.length}</h2>
        <button className="restart-button" data-testid="restart-button">
          Play Again
        </button>
      </div>
    </div>
  );
}

export default App;
