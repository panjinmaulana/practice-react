import React, { useState, useEffect } from "react";

export default function App3() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(15);

  const lastIndex = currentPage * todosPerPage;
  const firstIndex = lastIndex - todosPerPage;
  const currentTodos = todos.slice(firstIndex, lastIndex);

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    async function fecthTodos() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const data = await res.json();
      setTodos(data);
    }

    fecthTodos();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Todo</h1>
      <ul className="list-group">
        {currentTodos.map((todo) => {
          return (
            <li key={todo.id} className="list-group-item">
              {todo.id} - {todo.title}
            </li>
          );
        })}
      </ul>
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination">
          {pageNumber.map((numb) => {
            return (
              <li key={numb} className="page-item">
                <button
                  className="page-link"
                  onClick={(e) => setCurrentPage(numb)}
                >
                  {numb}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
