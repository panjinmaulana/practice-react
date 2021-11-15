import React, { useState, useEffect } from "react";

export default function App4() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState({
    userId: 1,
    id: "",
    title: "",
    body: "",
  });

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  function handleOnChange(e) {
    const { name, value } = e.target;

    setInput({ ...input, id: posts.length + 1, [name]: value });
  }

  function handleOnClick(e) {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    };

    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("data berhasil"));
  }

  return (
    <div className="container mt-5">
      <h1 className="text-primary my-2">Form Add</h1>
      <form>
        <div class="mb-3">
          <label for="title" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            name="title"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div class="mb-3">
          <label for="body" class="form-label">
            Body
          </label>
          <input
            type="text"
            class="form-control"
            name="body"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          onClick={(e) => handleOnClick(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
