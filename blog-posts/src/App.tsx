/*
Problem Statement: Build a blog UI for a content platform.
The platform stores a list of blog posts, each with a title, description, tags, 
views and reactions(likes and dislikes). Create a React resuable component for each
blog post that displays this data in a clean, structured format.
*/

import "./App.css";
import PostCard from "./PostCard.tsx";
import postsData from "./postsData.ts";

function App() {
  return (
    <div>
      <h2>Blog Posts</h2>
      <div className="posts-grid">
        {postsData.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default App;
