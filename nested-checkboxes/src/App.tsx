import { useState } from "react";
import "./App.css";

interface CheckboxItem {
  id: number;
  name: string;
  children?: CheckboxItem[];
}

type CheckboxesData = CheckboxItem[];

type CheckboxState = { [key: number]: boolean };

type CheckBoxesProps = {
  data: CheckboxesData;
  checked: CheckboxState;
  setChecked: React.Dispatch<React.SetStateAction<CheckboxState>>;
};

const checkboxesData: CheckboxesData = [
  {
    id: 1,
    name: "Fruits",
    children: [
      {
        id: 2,
        name: "Citrus",
        children: [
          {
            id: 3,
            name: "Orange",
          },
          {
            id: 4,
            name: "Lemon",
          },
        ],
      },
      {
        id: 5,
        name: "Berries",
        children: [
          {
            id: 6,
            name: "Strawberry",
          },
          {
            id: 7,
            name: "Cranberry",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Vegetables",
    children: [
      {
        id: 9,
        name: "Carrot",
      },
      {
        id: 10,
        name: "Potato",
      },
    ],
  },
];

const CheckBoxes = ({ data, checked, setChecked }: CheckBoxesProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    node: CheckboxItem
  ) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: e.target.checked };
      // Todo: If children are present, add all of them to new state
      return newState;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div key={node.id} className="parent">
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e, node)}
          />
          <span>{node.name}</span>
          {node.children && (
            <CheckBoxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [checked, setChecked] = useState<CheckboxState>({});

  return (
    <div>
      <h1>Nested Checkboxes</h1>
      <CheckBoxes
        data={checkboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}

export default App;
