import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

function TodoList({ setOpen, open }) {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      if (editId === null) {
        setTodos([...todos, { id: Date.now(), text: inputValue }]);
      } else {
        const updatedTodos = todos.map((todo) =>
          todo.id === editId ? { ...todo, text: inputValue } : todo
        );
        setTodos(updatedTodos);
        setEditId(null);
      }
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInputValue(todoToEdit.text);
    setEditId(id);
  };

  return (
    <React.Fragment>
      <Navbar setOpen={setOpen} open={open} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "silver", fontSize: "2rem", fontWeight: "bold" }}>
          Chess Improvement to do List
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ borderRadius: "5px", border: "1px solid silver", padding: "0.5rem", marginRight: "1rem", width: "70%" }}
          />
          <button type="submit" style={{ borderRadius: "5px", background: "silver", color: "white", border: "none", padding: "0.5rem", cursor: "pointer" }}>{editId === null ? "Add" : "Save"}</button>
        </form>

        <ul style={{ marginTop: "2rem", listStyle: "none", padding: "0" }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem", borderRadius: "5px", background: "silver" }}>
              <span style={{ color: "black" }}>{todo.text}</span>
              <div>
                <button onClick={() => deleteTodo(todo.id)} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", marginRight: "0.5rem" }}>Delete</button>

                <button onClick={() => editTodo(todo.id)} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default TodoList;
