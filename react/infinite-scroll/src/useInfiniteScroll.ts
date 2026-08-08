import { useEffect, useRef, useState, useCallback } from "react";

type UseInfiniteScrollProps<T> = {
  fetchFn: (page: number, signal: AbortSignal) => Promise<T[]>;
  hasMoreInitial?: boolean;
};

export function useInfiniteScroll<T>({
  fetchFn,
  hasMoreInitial = true,
}: UseInfiniteScrollProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(hasMoreInitial);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    // cancel previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const newItems = await fetchFn(page, controller.signal);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...newItems]);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, page, loading, hasMore]);

  useEffect(() => {
    if (!hasMore) return;

    let isMounted = true;

    const controller = new AbortController();
    abortRef.current?.abort(); // cancel previous
    abortRef.current = controller;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const newItems = await fetchFn(page, controller.signal);

        if (!isMounted) return;

        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setData((prev) => [...prev, ...newItems]);
        }
      } catch (err: any) {
        if (err.name !== "AbortError" && isMounted) {
          setError("Something went wrong");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [page, fetchFn, hasMore]);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        {
          rootMargin: "100px", // prefetch before reaching bottom
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore],
  );

  const retry = () => {
    setError(null);
    loadData();
  };

  return {
    data,
    loading,
    error,
    hasMore,
    lastElementRef,
    retry,
  };
}
