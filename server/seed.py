import requests
from app import app
from database import db
from models import db, Player, Team, User

# Chess.com API URL to fetch top players
TOP_PLAYERS_API_URL = "https://api.chess.com/pub/titled/GM"

def team_creations():    
    team_names = []
    for i in range(1, 11):  # Create 10 teams
        team_name = f"Team {i}"
        team = Team(team_name=team_name)
        team_names.append(team)

    db.session.add_all(team_names)
    db.session.commit()

def fetch_top_chess_players():
    response = requests.get(TOP_PLAYERS_API_URL)
    return response.json()["players"]

def adding_players():
    top_players = fetch_top_chess_players()
    players = []

    for i, player_username in enumerate(top_players[:50]):  # Add top 50 players
        team_name = f"Team {(i % 10) + 1}"  # Assign players to teams in a round-robin fashion
        team = Team.query.filter_by(team_name=team_name).first()
        player = Player(
            name=player_username,
            team=team
        )
        players.append(player)

    db.session.add_all(players)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        Player.query.delete()
        Team.query.delete()
        User.query.delete()
        team_creations()
        adding_players()
