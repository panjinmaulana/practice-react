import React, { useState, useEffect } from "react";

export default function App2() {
  const [data, setData] = useState([]);

  const [input, setInput] = useState({ id: "", title: "" });

  useEffect(() => {
    setData([
      {
        id: 1,
        title: "delectus aut autem",
      },
      {
        id: 2,
        title: "quis ut nam facilis et officia qui",
      },
      {
        id: 3,
        title: "fugiat veniam minus",
      },
      {
        id: 4,
        title: "et porro tempora",
      },
      {
        id: 5,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
      },
    ]);
  }, []);

  function handleInput(e) {
    setInput({ ...input, id: data.length + 1, title: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setData([...data, input]);
  }

  function handleInputEdit(e, id, title) {
    setInput({ ...input, id: id, title: e.target.value });
  }

  function handleUpdate(e, id, title) {
    e.preventDefault();

    setData([...data, input]);
  }

  function handleDelete(e, id) {
    e.preventDefault();

    const filteredData = data.filter((el) => {
      if (id != el.id) {
        return true;
      } else {
        return false;
      }
    });

    setData(filteredData);
  }

  return (
    <div className="container mt-5">
      <ul class="list-group">
        {data.map((el) => {
          return (
            <>
              {input.id == el.id ? (
                <>
                  <label for="title" class="form-label">
                    Edit
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    onChange={(e) => handleInputEdit(e, el.id, el.title)}
                    value={input.title}
                  />
                </>
              ) : (
                <li key={el.id} class="list-group-item">
                  {el.title}
                </li>
              )}

              <div className="d-flex mb-5" style={{ width: "15%" }}>
                {input.id == el.id ? (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(e) => handleUpdate(e)}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(e) => setInput({ id: el.id, title: el.title })}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => handleDelete(e, el.id)}
                >
                  Delete
                </button>
              </div>
            </>
          );
        })}
      </ul>

      <hr />

      <div className="row mb-5">
        <div className="col">
          <form>
            <div class="mb-3">
              <label for="title" class="form-label">
                Title
              </label>
              <input
                type="email"
                class="form-control"
                onChange={(e) => handleInput(e)}
                value={input.title}
              />
            </div>
            <button
              type="button"
              class="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
