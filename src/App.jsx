import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function App() {
  //   paginate
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  //   searching
  const [input, setInput] = useState("");
  const [postID, setPostID] = useState(0);

  //   sorting
  const [sortData, setSortData] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setLoading(false);
      setComments(data);
      setPageCount(Math.ceil(total / limit));
    }

    fetchComments();
  }, [currentPage]);

  if (loading) {
    return <h6 className="text-center mt-5">Loading...</h6>;
  }

  return (
    <div className="container mt-5">
      <input
        className="mb-3"
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="dropdown mb-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <button
              onClick={() => setSortData("A-Z")}
              className="dropdown-item"
            >
              A-Z
            </button>
          </li>
          <li>
            <button
              onClick={() => setSortData("Z-A")}
              className="dropdown-item"
            >
              Z-A
            </button>
          </li>
        </ul>
      </div>
      <div className="dropdown mb-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Post ID
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <button onClick={() => setPostID(1)} className="dropdown-item">
              1
            </button>
          </li>
          <li>
            <button onClick={() => setPostID(2)} className="dropdown-item">
              2
            </button>
          </li>
          <li>
            <button onClick={() => setPostID("all")} className="dropdown-item">
              All
            </button>
          </li>
        </ul>
      </div>
      <ul className="list-group mb-3">
        {comments.length &&
          comments
            .sort((firstComment, secondComment) => {
              //   if (number) - else if (string) </>
              if (sortData === "A-Z") {
                return firstComment.name > secondComment.name;
              } else if (sortData === "Z-A") {
                return firstComment.name < secondComment.name;
              }
            })
            .filter((comment) => {
              if (postID == "1") {
                return String(comment.postId).includes(1);
              } else if (postID == "2") {
                return String(comment.postId).includes(2);
              } else {
                return comment;
              }
            })
            .filter((comment) => {
              if (comment.name.toLowerCase().includes(input.toLowerCase())) {
                return comment;
              } else if (input === "") {
                return comment;
              }
            })
            .map((comment) => {
              return (
                <li key={comment.id} className="list-group-item">
                  {comment.id} - {comment.name}
                </li>
              );
            })}
      </ul>

      <ReactPaginate
        containerClassName={"pagination justify-content-center"}
        previousLabel={"Previous"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLabel={"Next"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLabel={"..."}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        pageCount={pageCount}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
        onPageChange={(page) => setCurrentPage(page.selected + 1)}
      />
    </div>
  );
}

export default App;
