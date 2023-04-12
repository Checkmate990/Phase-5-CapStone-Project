import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }


  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="navbar">
      <div className="logo">ChessTourney</div>
      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tournaments">Tournaments</Link>
        {user ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
