import { useEffect, useState, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isInitialMount = useRef(true);

  const readValue = (): T => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(readValue);

  // Write to localStorage when value changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  }, [key, value]);

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key) return;

      try {
        const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;

        setValue(newValue);
      } catch {
        setValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue]);

  return [value, setValue] as const;
}
