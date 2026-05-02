type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

type Listener = (msg: Message) => void;

export class MockSocket {
  private listeners = new Set<Listener>();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private messageId = 0;

  connect() {
    // simulate incoming messages every 5s
    this.intervalId = setInterval(() => {
      const message: Message = {
        id: this.messageId++,
        text: "Hello from server 👋",
        sender: "bot",
      };

      this.listeners.forEach((l) => l(message));
    }, 5000);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.listeners.clear();
  }

  send(text: string) {
    const message: Message = {
      id: this.messageId++,
      text,
      sender: "user",
    };

    this.listeners.forEach((l) => l(message));
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}
