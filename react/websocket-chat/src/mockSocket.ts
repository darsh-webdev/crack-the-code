type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

type Listener = (msg: Message) => void;
type StatusListener = (connected: boolean) => void;

export class MockSocket {
  private listeners = new Set<Listener>();
  private statusListeners = new Set<StatusListener>();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private messageId = 0;

  connect() {
    // simulate incoming messages every 5s
    setTimeout(() => {
      this.statusListeners.forEach((l) => l(true));
    }, 200);

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
    this.statusListeners.forEach((l) => l(false));
    this.listeners.clear();
    this.statusListeners.clear();
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

  onStatusChange(listener: StatusListener) {
    this.statusListeners.add(listener);
    return () => this.statusListeners.delete(listener);
  }
}
