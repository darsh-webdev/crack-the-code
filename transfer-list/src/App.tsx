import { useState } from "react";
import "./App.css";

function App() {
  const [availableItems, setAvailableItems] = useState([
    "Item A",
    "Item B",
    "Item C",
  ]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const handleCheck = (item: string) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const resetChecked = (items: string[]) => {
    setChecked((prev) => {
      const newChecked = { ...prev };
      items.forEach((item) => {
        delete newChecked[item];
      });
      return newChecked;
    });
  };

  const moveToSelected = () => {
    const toMove = availableItems.filter((item) => checked[item]);
    setSelectedItems((prev) => [...prev, ...toMove]);
    setAvailableItems((prev) => prev.filter((item) => !checked[item]));
    resetChecked(toMove);
  };

  const moveToAvailable = () => {
    const toMove = selectedItems.filter((item) => checked[item]);
    setAvailableItems((prev) => [...prev, ...toMove]);
    setSelectedItems((prev) => prev.filter((item) => !checked[item]));
    resetChecked(toMove);
  };

  return (
    <div className="main">
      <h1>Transfer List</h1>

      <div className="container">
        <div>
          <h2>Available</h2>
          {availableItems.map((item) => (
            <div key={item}>
              <label>
                <input
                  type="checkbox"
                  checked={checked[item] || false}
                  onChange={() => handleCheck(item)}
                />
                {item}
              </label>
            </div>
          ))}
        </div>

        <div className="buttons">
          <button type="button" onClick={moveToSelected}>
            →
          </button>
          <br />
          <button type="button" onClick={moveToAvailable}>
            ←
          </button>
        </div>

        <div>
          <h2>Selected</h2>
          {selectedItems.map((item) => (
            <div key={item}>
              <label>
                <input
                  type="checkbox"
                  checked={checked[item] || false}
                  onChange={() => handleCheck(item)}
                />
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
