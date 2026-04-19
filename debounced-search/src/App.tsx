import { useState, useRef, useEffect } from "react";
import "./App.css";

type Result = {
  id: number;
  title: string;
};

// Simulated API
const searchAPI = (query: string, signal: AbortSignal): Promise<Result[]> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const data = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        title: `${query} result ${i + 1}`,
      }));
      resolve(data);
    }, 800);

    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
};

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Debounce logic
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const displayResults = debouncedQuery.trim() ? results : [];

  // API call when debounced query changes
  useEffect(() => {
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await searchAPI(debouncedQuery, controller.signal);

        if (isMounted) {
          setResults(data);
        }
      } catch (err: any) {
        if (err.name !== "AbortError" && isMounted) {
          setError("Something went wrong");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [debouncedQuery]);

  return (
    <div className="container">
      <h1>Debounced Search</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="input"
      />

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">{error}</p>}

      <ul className="results">
        {displayResults.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
