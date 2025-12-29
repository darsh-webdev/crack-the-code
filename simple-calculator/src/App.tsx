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
  return (
    <div className="calculator-container">
      <h1 className="title">Simple Calculator</h1>
      <input className="display" readOnly />

      <div className="button-grid">
        <button className="clear-btn">
          <span className="icon-clear">
            <TrashIcon />
          </span>
        </button>
        <button>
          <span className="icon-sqrt">
            <RadicalIcon />
          </span>
        </button>
        <button>
          <span className="icon-percent">
            <PercentIcon />
          </span>
        </button>
        <button>
          <span className="icon-divide">
            <DivideIcon />
          </span>
        </button>

        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>
          <span className="icon-multiply">
            <XIcon />
          </span>
        </button>

        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>
          <span className="icon-minus">
            <MinusIcon />
          </span>
        </button>

        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>
          <span className="icon-plus">
            <PlusIcon />
          </span>
        </button>

        <button>0</button>
        <button>.</button>
        <button>(</button>
        <button>)</button>

        <button className="back-btn">
          <span className="icon-backspace">
            <DeleteIcon />
          </span>
        </button>
        <button className="equal-btn">
          <span className="icon-equal">
            <EqualIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;
