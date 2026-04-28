type QueryState<T> = {
  data?: T;
  error?: string;
  isLoading: boolean;
  updatedAt: number;
  promise?: Promise<T>;
};

class QueryClient {
  private cache = new Map<string, QueryState<any>>();

  get<T>(key: string): QueryState<T> | undefined {
    return this.cache.get(key);
  }

  set<T>(key: string, state: QueryState<T>) {
    this.cache.set(key, state);
  }

  clear(key: string) {
    this.cache.delete(key);
  }
}

export const queryClient = new QueryClient();
