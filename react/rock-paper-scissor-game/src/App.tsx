import { useState } from "react";
import "./App.css";

type Choice = "rock" | "paper" | "scissor";

type Choices = {
  text: Choice;
  emoji: string;
};

function App() {
  const choices: Choices[] = [
    { text: "rock", emoji: "👊" },
    { text: "paper", emoji: "🖐️" },
    { text: "scissor", emoji: "✌️" },
  ];
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState("Press Any One");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  function PlayGame(playerChoice: Choice) {
    //  Game Logic
    const randomNum = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    const computerChoice = choices[randomNum].text;

    setPlayerChoice(playerChoice);
    setComputerChoice(computerChoice);

    if (playerChoice === computerChoice) {
      setResult("It's a Tie");
    } else if (
      (playerChoice === "rock" && computerChoice === "scissor") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissor" && computerChoice === "paper")
    ) {
      setResult("You Win");
      setPlayerScore(playerScore + 1);
    } else {
      setResult("You Lose");
      setComputerScore(computerScore + 1);
    }
  }

  function Reset() {
    //  Resets the scores and choices
    setComputerChoice(null);
    setPlayerChoice(null);
    setResult("Press Any One");
    setPlayerScore(0);
    setComputerScore(0);
  }

  return (
    <div className="rockPaperScissor">
      <h1>Rock Paper Scissor</h1>
      <p>
        A two-player hand game where each player chooses rock, paper, or
        scissors.
      </p>

      <div className="container">
        <div className="choices">
          {/* Buttons for Rock, Paper, Scissor */}
          {choices.map((choice) => (
            <button
              key={choice.text}
              data-testid={`btn-${choice.text}`}
              onClick={() => PlayGame(choice.text)}
            >
              {choice.emoji}
            </button>
          ))}
        </div>
        <div className="rockPaperScissor-result">
          <p data-testid="player-choice">
            You Chose: <b>{playerChoice}</b>
          </p>
          <p data-testid="computer-choice">
            Computer Choose : <b>{computerChoice}</b>
          </p>
          <p className="win-result" data-testid="result">
            {result}
          </p>
        </div>

        <div className="rockPaperScissor-scores">
          <h3 className="playerScore" data-testid="player-score">
            Player Score: <span>{playerScore}</span>
          </h3>
          <h3 className="computerScore" data-testid="computer-score">
            Computer Score: <span>{computerScore}</span>
          </h3>
        </div>

        <div className="reset-scores">
          <button onClick={Reset} data-testid="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
