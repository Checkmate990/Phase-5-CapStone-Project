import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import Marketplace from "./pages";
import List from "./pages/list";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./pages/card";
import BeginnerChessLesson from "./pages/BeginnerChessLesson";
import TodoList from "./pages/TodoList";

function App() {
  const [open, setOpen] = useState(false);
  const BaseUrl = "http://127.0.0.1:5000/";
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Marketplace setOpen={setOpen} open={open} BaseUrl={BaseUrl} />
            }
          />
          <Route
            path="/list/:id"
            element={<List setOpen={setOpen} open={open} BaseUrl={BaseUrl} />}
          />
          <Route
            path="/card"
            element={<Card setOpen={setOpen} open={open} BaseUrl={BaseUrl} />}
          />
          <Route
            path="/chess-events"
            element={ <BeginnerChessLesson setOpen={setOpen} open={open} BaseUrl={BaseUrl} />}
          />
          <Route
            path="/chess-to-do-list"
            element={ <TodoList setOpen={setOpen} open={open} BaseUrl={BaseUrl} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
