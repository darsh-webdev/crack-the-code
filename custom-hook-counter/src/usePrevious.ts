import { useEffect, useRef } from "react";

export default function usePrevious(value: number): number | undefined {
  const ref = useRef<number | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
