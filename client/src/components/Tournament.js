import React, { useState } from "react";

function Tournament() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  // Add functions here to handle adding/removing teams and generating matches

  return (
    <div>
      <h1>Tournament</h1>
      <div>
        <h2>Teams</h2>
        <ul>
          {teams.map((team) => (
            <li key={team.id}>{team.name}</li>
          ))}
        </ul>
        {/* Add form and button to add teams here */}
      </div>
      <div>
        <h2>Matches</h2>
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              {match.team1.name} vs {match.team2.name}
            </li>
          ))}
        </ul>
        {/* Add button to generate matches here */}
      </div>
    </div>
  );
}

export default Tournament;
