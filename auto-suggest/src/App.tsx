import { useState, useMemo, useRef, useEffect } from "react";
import { searchAPI, type Suggestion } from "./mockSearch";
import "./App.css";

type Cache = Map<string, Suggestion[]>;

function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const start = lowerText.indexOf(lowerQuery);

  if (start === -1) return text;

  const end = start + query.length;

  return (
    <>
      {text.slice(0, start)}
      <span className="highlight">{text.slice(start, end)}</span>
      {text.slice(end)}
    </>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const cacheRef = useRef<Cache>(new Map());
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce input
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Fetch suggestions
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    // Serve from cache
    const cached = cacheRef.current.get(debouncedQuery);
    if (cached) {
      setResults(cached);
      return;
    }

    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    let isActive = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await searchAPI(debouncedQuery, controller.signal);

        if (!isActive) return;

        cacheRef.current.set(debouncedQuery, data);
        setResults(data);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [debouncedQuery]);

  const hasResults = useMemo(() => results.length > 0, [results]);

  return (
    <div className="container">
      <h1>Autosuggest with Highlight + Caching</h1>

      <input
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {loading && <p className="loading">Loading...</p>}

      {hasResults && (
        <ul className="list">
          {results.map((item) => (
            <li key={item.id} className="item">
              {highlightMatch(item.label, debouncedQuery)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
