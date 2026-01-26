import { useState, useEffect } from "react";
import "./App.css";

export default function ListSorter({
  initialList = [],
}: {
  initialList: string[];
}) {
  return (
    <div data-testid="container">
      <div>
        <h2> List Sorter</h2>
      </div>
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" data-testid="sort-dropdown"></select>
      {initialList.length > 0 && (
        <div>
          <ul data-testid="list">
            {initialList.map((item, index) => (
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
