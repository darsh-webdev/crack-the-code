import { useState } from "react";
import "./App.css";

function App() {
  //  Implement state for characters, loading, error
  //  Implement search, statusFilter, sortOrder states
  //  Fetch characters from API using useEffect
  //  Filter and sort characters based on user input

  return (
    <div>
      <h1>Rick And Morty Characters</h1>
      <div className="container">
        <div className="controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name..."
            data-testid="search-input"
          />
          <select data-testid="status-filter" className="status-filter">
            <option value="All">All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
          <select data-testid="sort-order" className="sort-filter">
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
        </div>

        <div className="character-grid">
          {/* Display loading, error, no characters, and character cards */}
        </div>
      </div>
    </div>
  );
}

export default App;
