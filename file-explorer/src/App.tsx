import { useState } from "react";
import FileAndFolder from "./FileAndFolder";
import "./App.css";

const initialData = [
  {
    id: 1,
    name: "public",
    isFolder: true,
    children: [{ id: 2, name: "index.html", isFolder: false }],
  },
  {
    id: 3,
    name: "src",
    isFolder: true,
    children: [
      { id: 4, name: "App.js", isFolder: false },
      { id: 5, name: "index.js", isFolder: false },
    ],
  },
  { id: 6, name: "package.json", isFolder: false },
];

function App() {
  const [data, setData] = useState(initialData);
  const [idCounter, setIdCounter] = useState(7);

  return (
    <div>
      <h2>File Explorer</h2>
      <FileAndFolder data={data} />
    </div>
  );
}

export default App;
