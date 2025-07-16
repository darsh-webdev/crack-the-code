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
      { id: 2, name: "Apple" },
      { id: 3, name: "Banana" },
      {
        id: 4,
        name: "Citrus",
        children: [
          { id: 5, name: "Orange" },
          { id: 6, name: "Lemon" },
        ],
      },
      {
        id: 7,
        name: "Berries",
        children: [
          { id: 8, name: "Blueberry" },
          { id: 9, name: "Cranberry" },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Vegetables",
    children: [
      { id: 11, name: "Carrot" },
      { id: 12, name: "Broccoli" },
    ],
  },
];

const CheckBoxes = ({ data, checked, setChecked }: CheckBoxesProps) => {
  const handleChange = (isChecked: boolean, node: CheckboxItem) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };
      // If children are present, add all of them to new state
      const updateChildren = (node: CheckboxItem) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          if (child.children) {
            updateChildren(child);
          }
        });
      };
      updateChildren(node);

      // If all children are checked, mark the parent as checked
      const verifyChecked = (node: CheckboxItem): boolean => {
        if (!node.children) {
          return newState[node.id] || false;
        }

        // Check if all chilren are selected
        const allChildrenChecked = node.children.every((child) =>
          verifyChecked(child)
        );
        newState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      };
      checkboxesData.forEach((node) => {
        verifyChecked(node);
      });

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
            onChange={(e) => handleChange(e.target.checked, node)}
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
