import { useEffect, useRef, useState } from "react";
import "./App.css";

const NO_OF_DIGITS = 6;

function App() {
  const [inputArr, setInputArr] = useState(new Array(NO_OF_DIGITS).fill(""));
  const refArr = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleInput = (value: string, index: number) => {
    if (isNaN(Number(value))) return; // Check if input is Number, no chars allowed

    const newArr = [...inputArr];
    const newValue = value.trim();
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    if (newValue) {
      refArr.current[index + 1]?.focus();
    }
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.currentTarget;
    if (!target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };
  return (
    <div>
      <h1>OTP Input</h1>
      {inputArr.map((input, index) => (
        <input
          className="otp-input"
          key={index}
          type="text"
          value={inputArr[index]}
          ref={(input) => {
            refArr.current[index] = input;
          }}
          onChange={(e) => handleInput(e.target.value, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
        />
      ))}
    </div>
  );
}

export default App;
