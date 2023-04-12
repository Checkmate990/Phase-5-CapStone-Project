import React from "react";

function Home({ user }) {
  if (user) {
    return <h1 className="home">Welcome, {user.username}!</h1>;
  } else {
    return (
      <h1 className="home">Please Login or Sign Up</h1>
    );
  }
}

export default Home;
