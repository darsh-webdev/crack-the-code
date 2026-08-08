import { useEffect, useState } from "react";
import { queryClient } from "./queryClient";

type UseQueryOptions = {
  staleTime?: number;
};

export function useQuery<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options?: UseQueryOptions,
) {
  const staleTime = options?.staleTime ?? 0;

  const [state, setState] = useState(() => {
    return (
      queryClient.get<T>(key) ?? {
        data: undefined,
        error: undefined,
        isLoading: true,
        updatedAt: 0,
      }
    );
  });

  useEffect(() => {
    let isMounted = true;

    const cached = queryClient.get<T>(key);
    const now = Date.now();

    // Use cache if fresh
    if (cached && now - cached.updatedAt < staleTime) {
      return; // already using cached state from initializer
    }

    // De-duplicate requests
    if (cached?.promise) {
      cached.promise.then(
        (data) => {
          if (isMounted) {
            setState({ ...cached, data, isLoading: false });
          }
        },
        (err) => {
          if (isMounted) {
            setState({ ...cached, error: err.message, isLoading: false });
          }
        },
      );
      return;
    }

    const promise = fetchFn();

    const newState = {
      ...cached,
      isLoading: true,
      promise,
    };

    queryClient.set(key, newState);

    promise
      .then((data) => {
        const updated = {
          data,
          error: undefined,
          isLoading: false,
          updatedAt: Date.now(),
        };

        queryClient.set(key, updated);

        if (isMounted) setState(updated);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unknown error";

        const updated = {
          data: undefined,
          error: message,
          isLoading: false,
          updatedAt: Date.now(),
        };

        queryClient.set(key, updated);

        if (isMounted) setState(updated);
      });

    return () => {
      isMounted = false;
    };
  }, [key, fetchFn, staleTime]);

  const refetch = async () => {
    queryClient.clear(key);
    const result = await fetchFn();
    const updated = {
      data: result,
      error: undefined,
      isLoading: false,
      updatedAt: Date.now(),
    };
    queryClient.set(key, updated);
    setState(updated);
  };

  return {
    ...state,
    refetch,
  };
}
