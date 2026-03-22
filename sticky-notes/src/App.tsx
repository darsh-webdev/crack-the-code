import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import "./App.css";

type Note = {
  id: number;
  content: string;
  color: string;
  position: { x: number; y: number };
  isDragging: boolean;
  offset: { x: number; y: number };
};

const COLORS = [
  "#fffa65",
  "#ff9aa2",
  "#ffb7b2",
  "#ffdac1",
  "#e2f0cb",
  "#b5ead7",
  "#c7ceea",
];

const NOTE_WIDTH = 200;
const NOTE_HEIGHT = 150;
const GAP = 15;
const COLUMNS = 3;

const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

const getGridPosition = (index: number) => {
  const col = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);

  return {
    x: col * (NOTE_WIDTH + GAP),
    y: row * (NOTE_HEIGHT + GAP),
  };
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addNote = () => {
    const occupiedPositions = new Set(
      notes.map((note) => `${note.position.x}, ${note.position.y}`),
    );

    let index = 0;
    let position = null;

    while (true) {
      const pos = getGridPosition(index);
      const key = `${pos.x}, ${pos.y}`;
      if (!occupiedPositions.has(key)) {
        position = pos;
        break;
      }
      index++;
    }

    const newNote = {
      id: Date.now(),
      content: "",
      color: getRandomColor(),
      position,
      isDragging: false,
      offset: { x: 0, y: 0 },
    };

    setNotes((prev) => [...prev, newNote]);
  };

  const removeNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updateText = (id: number, text: string) => {
    console.log("🚀 ~ updateText ~ text:", text);
    setNotes((prev) =>
      prev.map((prevNote) =>
        prevNote.id === id ? { ...prevNote, content: text } : prevNote,
      ),
    );
  };

  const noteToFront = (id: number) => {
    setNotes((prev) => {
      const note = prev.find((note) => note.id === id);
      const remainingNotes = prev.filter((note) => note.id !== id);
      return [...remainingNotes, note!];
    });
  };

  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
  ) => {
    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    const note = notes.find((note) => note.id === id);
    if (!note) return;

    // bring note to front
    noteToFront(id);

    const offsetX = e.clientX - containerRect.left - note.position.x;
    const offsetY = e.clientY - containerRect.top - note.position.y;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, isDragging: true, offset: { x: offsetX, y: offsetY } }
          : note,
      ),
    );
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (notes.every((note) => !note.isDragging)) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    setNotes((prev) =>
      prev.map((note) => {
        if (!note.isDragging) return note;
        let x = e.clientX - containerRect.left - note.position.x;
        let y = e.clientY - containerRect.top - note.position.y;

        const maxX = containerRect.width - NOTE_WIDTH;
        const maxY = containerRect.height - NOTE_HEIGHT;
        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        return { ...note, position: { x, y } };
      }),
    );
  };

  const onMouseUp = () => {
    setNotes((prev) =>
      prev.map((note) =>
        note.isDragging ? { ...note, isDragging: false } : note,
      ),
    );
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [notes.length]);

  return (
    <>
      <h1>Sticky Notes</h1>
      <div
        className="container"
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height:
              notes.length === 0
                ? "100%"
                : Math.max(
                    ...notes.map((note) => note.position.y + NOTE_HEIGHT),
                  ) + 30,
          }}
        >
          {notes.map((note, index) => (
            <div
              className="note"
              key={note.id}
              style={{
                backgroundColor: note.color,
                left: note.position.x,
                top: note.position.y,
                position: "absolute",
                cursor: "grab",
                userSelect: "none",
                zIndex: index + 1,
              }}
              onMouseDown={(e) => onMouseDown(e, note.id)}
            >
              <button
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeNote(note.id);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                title="Close"
              >
                <X className="icon-close" onClick={() => removeNote(note.id)} />
              </button>
              <textarea
                className="note-textarea"
                onChange={(e) => updateText(note.id, e.target.value)}
                value={note.content}
                placeholder="Enter text"
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
          ))}
        </div>

        <button className="add-note-btn">
          <Plus className="icon-add" onClick={addNote} />
        </button>
      </div>
    </>
  );
}

export default App;
