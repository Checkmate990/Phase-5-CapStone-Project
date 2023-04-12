import React from "react";
import Tournament from "./Tournament";

function Tournaments({ teamB }) {
  return (
    <div>
      <ul className="tournaments">
        {teamB.map((team) => {
          return (
            <Tournament
              key={team.id}
              teamBet={team}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Tournaments;
