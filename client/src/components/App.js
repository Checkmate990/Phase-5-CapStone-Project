import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import Tournaments from "./Tournaments";

export const FavoriteContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [chessTournaments, setChessTournaments] = useState([]);

  // Replace the following placeholder with an appropriate chess API
  const chessApi = "https://example-chess-api.com/tournaments";

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch(chessApi)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChessTournaments(data);
      });
  }, []);

  return (
      <Router>
        <div className="App">
          <NavBar user={user} setUser={setUser} />
          <Switch>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/tournaments"
              element={<Tournaments chessTournaments={chessTournaments} user={user} />}
            />
            
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            </Switch>
        </div>
      </Router>
  );
}

export default App;
