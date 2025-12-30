import { useState } from "react";
import "./App.css";
import {
  DeleteIcon,
  DivideIcon,
  EqualIcon,
  MinusIcon,
  PercentIcon,
  PlusIcon,
  RadicalIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";

function App() {
  const [display, setDisplay] = useState("");

  const handleButtonClick = (value: string) => {
    setDisplay((prev) => prev + value);
  };

  const handleDelete = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleCalculate = () => {
    try {
      // Replace square root symbol with Math.sqrt function
      const modifiedInput = display.replace(/√/g, "Math.sqrt");
      // eslint-disable-next-line react-hooks/unsupported-syntax
      const result = eval(modifiedInput);
      setDisplay(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <div className="calculator-container" data-testid="calc-container">
      <h1 className="title">Simple Calculator</h1>
      <input
        data-testid="calc-display"
        className="display"
        value={display}
        placeholder="Enter expression"
        readOnly
      />

      <div className="button-grid">
        <button
          data-testid="btn-clear"
          className="clear-btn"
          onClick={handleClear}
        >
          <span className="icon-clear">
            <TrashIcon data-testid="icon-clear" />
          </span>
        </button>
        <button data-testid="btn-sqrt" onClick={() => handleButtonClick("√(")}>
          <span className="icon-sqrt">
            <RadicalIcon data-testid="icon-sqrt" />
          </span>
        </button>
        <button
          data-testid="btn-modulus"
          onClick={() => handleButtonClick("%")}
        >
          <span className="icon-percent">
            <PercentIcon data-testid="icon-percent" />
          </span>
        </button>
        <button data-testid="btn-divide" onClick={() => handleButtonClick("/")}>
          <span className="icon-divide">
            <DivideIcon data-testid="icon-divide" />
          </span>
        </button>

        <button data-testid="btn-7" onClick={() => handleButtonClick("7")}>
          7
        </button>
        <button data-testid="btn-8" onClick={() => handleButtonClick("8")}>
          8
        </button>
        <button data-testid="btn-9" onClick={() => handleButtonClick("9")}>
          9
        </button>
        <button
          data-testid="btn-multiply"
          onClick={() => handleButtonClick("*")}
        >
          <span className="icon-multiply">
            <XIcon data-testid="icon-multiply" />
          </span>
        </button>

        <button data-testid="btn-4" onClick={() => handleButtonClick("4")}>
          4
        </button>
        <button data-testid="btn-5" onClick={() => handleButtonClick("5")}>
          5
        </button>
        <button data-testid="btn-6" onClick={() => handleButtonClick("6")}>
          6
        </button>
        <button data-testid="btn-minus" onClick={() => handleButtonClick("-")}>
          <span className="icon-minus">
            <MinusIcon data-testid="icon-minus" />
          </span>
        </button>

        <button data-testid="btn-1" onClick={() => handleButtonClick("1")}>
          1
        </button>
        <button data-testid="btn-2" onClick={() => handleButtonClick("2")}>
          2
        </button>
        <button data-testid="btn-3" onClick={() => handleButtonClick("3")}>
          3
        </button>
        <button data-testid="btn-plus" onClick={() => handleButtonClick("+")}>
          <span className="icon-plus">
            <PlusIcon data-testid="icon-plus" />
          </span>
        </button>

        <button data-testid="btn-0" onClick={() => handleButtonClick("0")}>
          0
        </button>
        <button data-testid="btn-dot" onClick={() => handleButtonClick(".")}>
          .
        </button>
        <button data-testid="btn-open" onClick={() => handleButtonClick("(")}>
          (
        </button>
        <button data-testid="btn-close" onClick={() => handleButtonClick(")")}>
          )
        </button>

        <button
          data-testid="btn-back"
          className="back-btn"
          onClick={handleDelete}
        >
          <span className="icon-backspace">
            <DeleteIcon data-testid="icon-backspace" />
          </span>
        </button>
        <button
          data-testid="btn-equal"
          className="equal-btn"
          onClick={handleCalculate}
        >
          <span className="icon-equal">
            <EqualIcon data-testid="icon-equals" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;
