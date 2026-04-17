import { useState, useRef, useEffect } from "react";
import "./App.css";

type Item = {
  id: number;
  text: string;
};

// simulate API
const fetchItems = (page: number, limit: number): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = Array.from({ length: limit }, (_, i) => ({
        id: page * limit + i,
        text: `Item ${page * limit + i + 1}`,
      }));
      resolve(items);
    }, 800);
  });
};

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newItems = await fetchItems(page, 10);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }

      setLoading(false);
    };

    fetchData();
  }, [page]);

  const lastItemRef = (node: HTMLDivElement | null) => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  };

  return (
    <div className="container">
      <h1>Infinite Scroll</h1>

      <div className="list">
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <div ref={lastItemRef} key={item.id} className="item">
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
      {!hasMore && <p className="end">No more items</p>}
    </div>
  );
}

export default App;
