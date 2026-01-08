import { useState, useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  duration: number;
};

const BG_COLOR = {
  success: "green",
  error: "red",
  info: "blue",
};

// Toast Component
const Toast = ({ message, type, duration }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="toast" style={{ backgroundColor: BG_COLOR[type] }}>
      {message}
    </div>
  );
};

export default Toast;
