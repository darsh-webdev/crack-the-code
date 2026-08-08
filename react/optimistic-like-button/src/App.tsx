import { useState, useRef } from "react";
import "./App.css";

type LikeResponse = {
  liked: boolean;
};

// Simulated API (random failure)
const toggleLikeAPI = (
  nextLiked: boolean,
  signal: AbortSignal,
): Promise<LikeResponse> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      // simulate 20% failure
      if (Math.random() < 0.2) {
        reject(new Error("Network error"));
        return;
      }

      resolve({ liked: nextLiked });
    }, 800);

    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
};

function App() {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0); // prevents race conditions

  const handleToggle = async () => {
    if (loading) return;

    const nextLiked = !liked;

    // Optimistic update
    setLiked(nextLiked);
    setLoading(true);
    setError(null);

    // Track request
    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;

    // Cancel previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await toggleLikeAPI(nextLiked, controller.signal);

      // ignore outdated responses
      if (currentRequestId !== requestIdRef.current) return;

      // sync with server response (optional)
      setLiked(res.liked);
    } catch (err: any) {
      if (err.name === "AbortError") return;

      // ignore outdated responses
      if (currentRequestId !== requestIdRef.current) return;

      // Rollback UI
      setLiked(!nextLiked);
      setError("Failed to update. Please try again.");
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h1>Optimistic Like Button</h1>

      <button
        className={`like-btn ${liked ? "liked" : ""}`}
        onClick={handleToggle}
        disabled={loading}
      >
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>

      {loading && <p className="loading">Updating...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
