import { useInfiniteScroll } from "./useInfiniteScroll";
import "./App.css";

type Item = {
  id: number;
  text: string;
};

// Simulated API
const fetchItems = async (
  page: number,
  signal: AbortSignal,
): Promise<Item[]> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolve(
        Array.from({ length: 10 }, (_, i) => ({
          id: page * 10 + i,
          text: `Item ${page * 10 + i + 1}`,
        })),
      );
    }, 800);

    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
};

function App() {
  const { data, loading, error, hasMore, lastElementRef, retry } =
    useInfiniteScroll<Item>({
      fetchFn: fetchItems,
    });

  return (
    <div className="container">
      <h1>Infinite Scroll</h1>

      <div className="list">
        {data.map((item, index) => {
          if (index === data.length - 1) {
            return (
              <div ref={lastElementRef} key={item.id} className="item">
                {item.text}
              </div>
            );
          }

          return (
            <div key={item.id} className="item">
              {item.text}
            </div>
          );
        })}
      </div>

      {loading && <p className="loading">Loading...</p>}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}

      {!hasMore && <p className="end">No more items</p>}
    </div>
  );
}

export default App;
