import { useState, useEffect } from "react";
import "./App.css";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

function App() {
  //  Implement state for characters, loading, error
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //  Implement search, statusFilter, sortOrder states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  //  Fetch characters from API using useEffect
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character",
        );
        const data = await response.json();
        setCharacters(data.results);
      } catch (err: unknown) {
        setError("Failed to fetch characters.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "green";
      case "Dead":
        return "red";
      default:
        return "gray";
    }
  };

  //  Filter and sort characters based on user input
  const filteredCharacters = characters
    .filter((char) =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((char) =>
      statusFilter === "All" ? true : char.status === statusFilter,
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            data-testid="status-filter"
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
          <select
            data-testid="sort-order"
            className="sort-filter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
        </div>

        <div className="character-grid">
          {/* Display loading, error, no characters, and character cards */}
          {filteredCharacters.length === 0 && !loading && !error && (
            <p data-testid="no-characters">No characters found</p>
          )}
          {loading && <p data-testid="loading">Loading...</p>}
          {error && <p data-testid="error-message">{error}</p>}
          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              className="card"
              data-testid={`character-${character.id}`}
            >
              <img src={character.image} alt={character.name} />
              <h3 className="char-name">{character.name}</h3>
              <p
                className="char-status"
                style={{ color: getStatusColor(character.status) }}
              >
                {character.status}
              </p>
              <p className="char-species">{character.species}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
