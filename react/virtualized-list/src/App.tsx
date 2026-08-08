import { useState, useMemo, useCallback } from "react";
import "./App.css";

type Item = {
  id: number;
  text: string;
};

const TOTAL_ITEMS = 10000;
const ITEM_HEIGHT = 50;
const CONTAINER_HEIGHT = 400;
const BUFFER = 5; // extra items for smoother scrolling

// generate large dataset
const generateItems = (): Item[] =>
  Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
    id: i,
    text: `Item ${i + 1}`,
  }));

function App() {
  const [scrollTop, setScrollTop] = useState(0);

  const items = useMemo(() => generateItems(), []);

  const totalHeight = items.length * ITEM_HEIGHT;

  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);

  const endIndex = Math.min(
    items.length,
    startIndex + visibleCount + BUFFER * 2,
  );

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div className="container">
      <h1>Virtualized List</h1>

      <div
        className="list-container"
        style={{ height: CONTAINER_HEIGHT }}
        onScroll={handleScroll}
      >
        <div className="spacer" style={{ height: totalHeight }}>
          <div
            className="items"
            style={{
              transform: `translateY(${startIndex * ITEM_HEIGHT}px)`,
            }}
          >
            {visibleItems.map((item) => (
              <div key={item.id} className="item">
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
