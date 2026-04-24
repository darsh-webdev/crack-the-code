import { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";

type Command = {
  id: number;
  title: string;
  action: () => void;
};

const commands: Command[] = [
  { id: 1, title: "Go to Home", action: () => alert("Home") },
  { id: 2, title: "Open Settings", action: () => alert("Settings") },
  { id: 3, title: "Logout", action: () => alert("Logout") },
  { id: 4, title: "Profile", action: () => alert("Profile") },
  { id: 5, title: "Help", action: () => alert("Help") },
];

function App() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const isMac = useMemo(() => {
    return navigator.platform.toLowerCase().includes("mac");
  }, []);

  const shortcutLabel = isMac ? "⌘ + K" : "Ctrl + K";

  const togglePalette = () => {
    setOpen((prev) => {
      const next = !prev;

      if (next) {
        setQuery("");
        setActiveIndex(0);
      }

      return next;
    });
  };

  // Open with Ctrl + K / Cmd + K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePalette();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (!open) return;

    const id = setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => clearTimeout(id);
  }, [open]);

  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!filteredCommands.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1,
        );
        break;

      case "Enter":
        filteredCommands[activeIndex].action();
        setOpen(false);
        break;

      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div className="container">
      <h1>Command Palette ({shortcutLabel})</h1>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="palette" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command..."
              className="input"
            />

            <ul className="list">
              {filteredCommands.length === 0 && (
                <li className="empty">No results</li>
              )}

              {filteredCommands.map((cmd, index) => (
                <li
                  key={cmd.id}
                  className={`item ${index === activeIndex ? "active" : ""}`}
                  onMouseDown={() => {
                    cmd.action();
                    setOpen(false);
                  }}
                >
                  {cmd.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
