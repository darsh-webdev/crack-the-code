export type Suggestion = {
  id: number;
  label: string;
};

export function searchAPI(
  query: string,
  signal: AbortSignal,
): Promise<Suggestion[]> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const results: Suggestion[] = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        label: `${query} result ${i + 1}`,
      }));
      resolve(results);
    }, 600);

    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}
