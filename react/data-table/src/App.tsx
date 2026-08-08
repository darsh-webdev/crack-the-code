import DataTable from "./DataTable";
import "./App.css";

const sampleData = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
  { id: 4, name: "David", age: 28 },
  { id: 5, name: "Eve", age: 27 },
  { id: 6, name: "Frank", age: 33 },
  { id: 7, name: "Grace", age: 24 },
  { id: 8, name: "Hank", age: 26 },
  { id: 9, name: "Ivy", age: 21 },
  { id: 10, name: "Jack", age: 29 },
];

function App() {
  return (
    <div>
      <h1>Data Table</h1>
      <DataTable data={sampleData} />
    </div>
  );
}

export default App;
