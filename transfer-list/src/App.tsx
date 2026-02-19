import { useState } from "react";
import "./App.css";

type Item = {
  id: number;
  name: string;
  isChecked: boolean;
};

function App() {
  const [listOne, setListOne] = useState<Item[]>([
    { id: 1, name: "Item A", isChecked: false },
    { id: 2, name: "Item B", isChecked: false },
    { id: 3, name: "Item C", isChecked: false },
  ]);
  const [listTwo, setListTwo] = useState<Item[]>([]);

  const handleCheckboxChange = (id: number) => {
    setListOne((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item,
      ),
    );
    setListTwo((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item,
      ),
    );
  };

  const handleMoveToLeft = () => {
    const selectedItems = listTwo
      .filter((item) => item.isChecked)
      .map((item) => ({ ...item, isChecked: false }));
    setListOne((prevList) => [...prevList, ...selectedItems]);
    setListTwo((prevList) => prevList.filter((item) => !item.isChecked));
  };

  const handleMoveToRight = () => {
    const selectedItems = listOne
      .filter((item) => item.isChecked)
      .map((item) => ({ ...item, isChecked: false }));
    setListTwo((prevList) => [...prevList, ...selectedItems]);
    setListOne((prevList) => prevList.filter((item) => !item.isChecked));
  };

  return (
    <div className="main">
      <h1>Transfer List</h1>

      <div className="container">
        <div>
          <h2>Available</h2>
        </div>
        <div className="buttons">
          <button type="button" onClick={handleMoveToRight}>
            →
          </button>
          <button type="button" onClick={handleMoveToLeft}>
            ←
          </button>
        </div>
        <div>
          <h2>Selected</h2>
        </div>
      </div>

      <div className="lists-container">
        <div className="list">
          {listOne.length > 0 &&
            listOne.map((item) => (
              <div>
                <input
                  key={item.id}
                  type="checkbox"
                  value={item.id}
                  id={`item-${item.id}`}
                  checked={item.isChecked}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <label htmlFor={`item-${item.id}`}>{item.name}</label>
              </div>
            ))}
        </div>
        <div className="list">
          {listTwo.length > 0 &&
            listTwo.map((item) => (
              <div>
                <input
                  key={item.id}
                  type="checkbox"
                  value={item.id}
                  id={`item-${item.id}`}
                  checked={item.isChecked}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <label htmlFor={`item-${item.id}`}>{item.name}</label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
