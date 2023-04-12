import React, { useState } from "react";

function SignUp({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [favoritePlayer, setFavoritePlayer] = useState("");
  const [favoriteOpening, setFavoriteOpening] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        favorite_player: favoritePlayer,
        favorite_opening: favoriteOpening,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user.username));
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="favorite_player">Favorite Player</label>
        <input
          type="text"
          id="favorite_player"
          autoComplete="off"
          value={favoritePlayer}
          onChange={(e) => setFavoritePlayer(e.target.value)}
        />
        <label htmlFor="favorite_opening">Favorite Opening</label>
        <input
          type="text"
          id="favorite_opening"
          autoComplete="off"
          value={favoriteOpening}
          onChange={(e) => setFavoriteOpening(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
