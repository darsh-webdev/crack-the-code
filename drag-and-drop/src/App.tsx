import { useCallback, useState } from "react";
import "./App.css";

type Item = { id: number; name: string };

const initialAvailable: Item[] = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Grape" },
  { id: 4, name: "Pineapple" },
  { id: 5, name: "Mango" },
];

function App() {
  const [available, setAvailable] = useState(initialAvailable);
  const [dropped, setDropped] = useState<Item[]>([]);
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);

  const reorder = (list: Item[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragStart = useCallback((item: Item, from: string) => {
    setDraggedItem(item);
    setDraggedFrom(from);
  }, []);

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(
    (to: string, e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!draggedItem) return;

      if (draggedFrom === to) {
        const list = to === "available" ? available : dropped;
        const draggedIndex = list.findIndex((i) => i.id === draggedItem.id);

        const droppedTargetId = (e.target as HTMLElement).getAttribute(
          "data-id",
        );
        const dropIndex = list.findIndex(
          (i) => i.id === Number(droppedTargetId),
        );

        if (dropIndex === -1) return;

        if (draggedIndex !== dropIndex) {
          const reorderedList = reorder(list, draggedIndex, dropIndex);
          if (to === "available") setAvailable(reorderedList);
          else setDropped(reorderedList);
        }
      } else {
        if (draggedFrom === "available") {
          setAvailable((prev) => prev.filter((i) => i.id !== draggedItem.id));
          setDropped((prev) => [...prev, draggedItem]);
        } else {
          setDropped((prev) => prev.filter((i) => i.id !== draggedItem.id));
          setAvailable((prev) => [...prev, draggedItem]);
        }
      }
      setDraggedFrom(null);
      setDraggedItem(null);
    },
    [draggedFrom, draggedItem, available, dropped],
  );

  const handleReset = () => {
    setAvailable(initialAvailable);
    setDropped([]);
    setDraggedFrom(null);
    setDraggedItem(null);
  };

  const renderItem = (item: Item, from: string) => {
    return (
      <div
        key={item.id}
        data-id={item.id}
        data-testid={`item-${item.id}`}
        className="item"
        draggable
        onDragStart={() => handleDragStart(item, from)}
      >
        {item.name}
      </div>
    );
  };

  return (
    <div className="app-wrapper">
      <header>
        <h1>Drag & Drop Fruits</h1>
        <button
          className="reset-btn"
          data-testid="reset-button"
          onClick={handleReset}
        >
          Reset Lists
        </button>
      </header>

      <div className="container">
        <div
          className="column"
          data-testid="available-column"
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop("available", e)}
        >
          <h2 data-testid="available-title">Available Fruits</h2>
          {available.length === 0 && (
            <p className="empty" data-testid="available-empty">
              No fruits here
            </p>
          )}
          {available.map((item) => renderItem(item, "available"))}
        </div>

        <div
          className="column drop-zone"
          data-testid="dropped-column"
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop("dropped", e)}
        >
          <h2 data-testid="dropped-title">Dropped Fruits</h2>
          {dropped.length === 0 && (
            <p className="empty" data-testid="dropped-empty">
              Drop fruits here
            </p>
          )}

          {dropped.map((item) => renderItem(item, "dropped"))}
        </div>
      </div>
    </div>
  );
}

export default App;
