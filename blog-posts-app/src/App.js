import React, { useState, useEffect } from "react";

function App() {
  // State for storing posts and any error message
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch posts from JSONPlaceholder API when the component mounts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => setPosts(data)) // Save the fetched posts in state
      .catch((err) => setError(err.message)); // Catch and store the error message
  }, []); 
  if(error){
    return <h1>{error}</h1>
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      {/* If there's an error, display the error message /}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/ If there are no posts and no error, show a loading message /}
      {!error && posts.length === 0 && <p>Loading posts...</p>}

      {/ Display the posts if fetched successfully */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
