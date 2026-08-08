import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import "./App.css";
import { syncTodo } from "./mockApi";
import { loadQueue, loadTodos, saveQueue, saveTodos } from "./storage";

import { type QueuedAction, type Todo } from "./types";

const App = () => {
  // Lazy initialization avoids effect-based state hydration
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  const [queue, setQueue] = useState<QueuedAction[]>(() => loadQueue());

  const [input, setInput] = useState("");

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const [syncing, setSyncing] = useState(false);

  const syncingRef = useRef(false);

  // Persist todos
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Persist queue
  useEffect(() => {
    saveQueue(queue);
  }, [queue]);

  // Online/offline listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);

      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Add todo
  const addTodo = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    const todo: Todo = {
      id: Date.now(),
      text: trimmed,
    };

    // optimistic local update
    setTodos((prev) => [...prev, todo]);

    // queue action for syncing
    setQueue((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "ADD",
        payload: todo,
      },
    ]);

    setInput("");
  };

  // Sync queue
  const syncQueue = useCallback(async () => {
    if (!isOnline) return;

    if (syncingRef.current) return;

    if (queue.length === 0) return;

    syncingRef.current = true;
    setSyncing(true);

    const remaining: QueuedAction[] = [];

    for (const action of queue) {
      try {
        if (action.type === "ADD") {
          await syncTodo(action.payload);
        }
      } catch {
        remaining.push(action);
      }
    }

    setQueue(remaining);

    syncingRef.current = false;
    setSyncing(false);
  }, [isOnline, queue]);

  // Sync when queue changes OR online status changes
  useEffect(() => {
    if (!isOnline) return;

    if (queue.length === 0) return;

    void syncQueue();
  }, [isOnline, queue, syncQueue]);

  const pendingCount = useMemo(() => queue.length, [queue]);

  return (
    <div className="container">
      <h1>Offline First Todo App</h1>

      <p className={`status ${isOnline ? "online" : "offline"}`}>
        {isOnline ? "Online" : "Offline"}
      </p>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add todo..."
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <p className="sync-status">
        {syncing ? "Syncing..." : `Pending sync: ${pendingCount}`}
      </p>

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
