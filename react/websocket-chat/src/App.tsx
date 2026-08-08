import { useState, useRef, useEffect, useCallback } from "react";
import { MockSocket } from "./mockSocket";
import "./App.css";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);

  const socketRef = useRef<MockSocket | null>(null);

  // Stable message handler (prevents re-subscription issues)
  const handleIncoming = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const handleStatus = useCallback((status: boolean) => {
    setConnected(status);
  }, []);

  // Connect / disconnect lifecycle
  useEffect(() => {
    const socket = new MockSocket();
    socketRef.current = socket;

    const unsubMsg = socket.subscribe(handleIncoming);
    const unsubStatus = socket.onStatusChange(handleStatus);

    socket.connect();

    return () => {
      unsubMsg();
      unsubStatus();
      socket.disconnect();
    };
  }, [handleIncoming, handleStatus]);

  // Send message
  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;

    socketRef.current.send(input.trim());
    setInput("");
  };

  return (
    <div className="container">
      <h1>WebSocket Chat</h1>

      <p className={`status ${connected ? "online" : "offline"}`}>
        {connected ? "Connected" : "Disconnected"}
      </p>

      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
