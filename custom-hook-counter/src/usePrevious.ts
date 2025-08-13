import { useEffect, useRef } from "react";

export default function usePrevious(value: number) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
