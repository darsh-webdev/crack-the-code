import { useState, useEffect } from "react";
import "./App.css";

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "A - Z (Alphabetical)", value: "asc" },
  { label: "Z - A (Reverse Alphabetical)", value: "desc" },
  { label: "Length (Shortest First)", value: "short" },
];

export default function ListSorter({
  initialList = [],
}: {
  initialList: string[];
}) {
  const [sortOption, setSortOption] = useState("default");
  const [list, setList] = useState([...initialList]);

  useEffect(() => {
    const sortList = (option: string) => {
      let sortedList = [...initialList];
      switch (option) {
        case "asc":
          sortedList.sort((a, b) => a.localeCompare(b));
          break;
        case "desc":
          sortedList.sort((a, b) => b.localeCompare(a));
          break;
        case "short":
          sortedList.sort((a, b) => a.length - b.length);
          break;
        case "default":
        default:
          sortedList = [...initialList];
          break;
      }

      setList(sortedList);
    };
    sortList(sortOption);
  }, [sortOption, initialList]);

  return (
    <div data-testid="container">
      <div>
        <h2 data-testid="heading">List Sorter</h2>
      </div>
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        data-testid="sort-dropdown"
        onChange={(e) => setSortOption(e.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {list.length > 0 && (
        <div>
          <ul data-testid="list">
            {list.map((item, index) => (
              <li key={index} data-testid="list-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
