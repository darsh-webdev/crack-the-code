import { useState } from "react";
import Toast from "./toast";
import "./App.css";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
  duration: number;
};

function App() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
    message: string,
    type: "success" | "error" | "info",
    duration: number
  ) => {
    const id = Number(crypto.randomUUID());
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  return (
    <div className="container">
      <h1>Reusable Toast</h1>
      <div className="toast-btns">
        <button onClick={() => addToast("Success Message", "success", 3000)}>
          Show Success
        </button>
        <button onClick={() => addToast("Error Message", "error", 4000)}>
          Show Error
        </button>
        <button onClick={() => addToast("Info Message", "info", 5000)}>
          Show Info
        </button>
      </div>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
        />
      ))}
    </div>
  );
}

export default App;
