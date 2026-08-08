import { useEffect, useRef, useState, useCallback } from "react";

type UseIdleTimerOptions = {
  timeout: number; // total idle time before logout (ms)
  warningTime?: number; // time before logout to show warning (ms)
  onLogout: () => void;
};

const EVENTS: (keyof DocumentEventMap)[] = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
];

export function useIdleTimer({
  timeout,
  warningTime = 5000,
  onLogout,
}: UseIdleTimerOptions) {
  const [isWarning, setIsWarning] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const warningRef = useRef<number | null>(null);

  // Clear timers safely
  const clearTimers = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      window.clearTimeout(warningRef.current);
    }
  };

  // Start timers
  const startTimers = useCallback(() => {
    clearTimers();

    // warning timer
    warningRef.current = window.setTimeout(() => {
      setIsWarning(true);
    }, timeout - warningTime);

    // logout timer
    timeoutRef.current = window.setTimeout(() => {
      onLogout();
    }, timeout);
  }, [timeout, warningTime, onLogout]);

  // Reset on activity
  const resetTimer = useCallback(() => {
    setIsWarning(false);
    startTimers();
  }, [startTimers]);

  useEffect(() => {
    startTimers();

    EVENTS.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      clearTimers();

      EVENTS.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer, startTimers]);

  return { isWarning, resetTimer };
}
