import { useQuery } from "./useQuery";
import "./App.css";

type Post = {
  id: number;
  title: string;
};

// Simulated API
const fetchPosts = async (): Promise<Post[]> => {
  await new Promise((res) => setTimeout(res, 800));

  if (Math.random() < 0.2) {
    throw new Error("Failed to fetch posts");
  }

  return Array.from({ length: 5 }, (_, i) => ({
    id: i,
    title: `Post ${i + 1}`,
  }));
};

function App() {
  const { data, error, isLoading, refetch } = useQuery<Post[]>(
    "posts",
    fetchPosts,
    { staleTime: 5000 },
  );

  return (
    <div className="container">
      <h1>Mini Query Client</h1>

      <button onClick={refetch}>Refetch</button>

      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="posts-list">
        {data?.map((post) => (
          <li className="post" key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
