from datetime import datetime

from project import db
from project.models import CommonModel, SurrogatePK


class Tournament(CommonModel, SurrogatePK):
    """
    Tournament model:
    - name: name of the tournament
    - description: description of the tournament
    - start_date: start date of the tournament
    - end_date: end date of the tournament
    - location: location of the tournament
    - image_url: image url of the tournament
    """
    __tablename__ = "tournaments"

    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, default=datetime.utcnow)
    location = db.Column(db.String(256), nullable=True)
    image_url = db.Column(db.String(256), nullable=True)

    is_active = db.Column(db.Boolean, default=True)

    def __init__(self, name: str, description: str, start_date: datetime, end_date: datetime, location: str, image_url: str, **kwargs):
        db.Model.__init__(
            self, name=name, description=description, start_date=start_date,
            end_date=end_date, location=location, image_url=image_url,
            **kwargs
        )

    def __repr__(self):
        return "<Tournament {}>".format(self.name)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "start_date": self.start_date.strftime("%Y-%m-%d %H:%M:%S"),
            "end_date": self.end_date.strftime("%Y-%m-%d %H:%M:%S"),
            "location": self.location,
            "image_url": self.image_url,
            "is_active": self.is_active,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


class Team(CommonModel, SurrogatePK):
    """
    Team model:
    - name: name of the team
    - captain_id: id of the captain of the team

    """
    __tablename__ = "teams"

    name = db.Column(db.String(128), nullable=False)
    captain_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    captain = db.relationship("User", backref="captain")

    is_active = db.Column(db.Boolean, default=True)

    def __init__(self, name: str, captain_id: int, **kwargs):
        db.Model.__init__(self, name=name, captain_id=captain_id, **kwargs)

    def __repr__(self):
        return "<{}>".format(self.__class__.__name__)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "captain_id": self.captain_id,
            "is_active": self.is_active,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


class Registration(CommonModel, SurrogatePK):
    """
    Registration model:
    - user_id: id of the user
    - tournament_id: id of the tournament
    - team_id: id of the team
    """
    __tablename__ = "registrations"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    tournament_id = db.Column(
        db.Integer, db.ForeignKey("tournaments.id"), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    user = db.relationship("User", backref="registrations")
    tournament = db.relationship("Tournament", backref="registrations")
    team = db.relationship("Team", backref="registrations")

    def __init__(self, user_id: int, tournament_id: int, team_id: int, **kwargs):
        db.Model.__init__(
            self, user_id=user_id, tournament_id=tournament_id, team_id=team_id, **kwargs)

    def __repr__(self):
        return "<{}>".format(self.__class__.__name__)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tournament_id": self.tournament_id,
            "team_id": self.team_id,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


class Match(CommonModel, SurrogatePK):
    """
    Match model:
    - tournament_id: id of the tournament
    - team1_id: id of the first team
    - team2_id: id of the second team
    - match_date: date of the match
    - match_time: time of the match
    """
    __tablename__ = "matches"

    tournament_id = db.Column(
        db.Integer, db.ForeignKey("tournaments.id"), nullable=False)
    team1_id = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    team2_id = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    match_date = db.Column(db.DateTime, default=datetime.utcnow)
    match_time = db.Column(db.DateTime, default=datetime.utcnow)
    tournament = db.relationship("Tournament", backref="matches")

    is_active = db.Column(db.Boolean, default=True)

    def __init__(self, tournament_id: int, team1_id: int, team2_id: int, match_date: datetime, match_time: datetime, **kwargs):
        db.Model.__init__(
            self, tournament_id=tournament_id, team1_id=team1_id, team2_id=team2_id, match_date=match_date, match_time=match_time, **kwargs)

    def __repr__(self):
        return "<{}>".format(self.__class__.__name__)

    def to_dict(self):
        return {
            "id": self.id,
            "is_active": self.is_active,
            "tournament_id": self.tournament_id,
            "team1_id": self.team1_id,
            "team2_id": self.team2_id,
            "match_date": self.match_date.strftime("%Y-%m-%d %H:%M:%S"),
            "match_time": self.match_time.strftime("%Y-%m-%d %H:%M:%S"),
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


class Result(CommonModel, SurrogatePK):
    """
    Result model:
    - match_id: id of the match
    - winner_id: id of the winner team
    - loser_id: id of the loser team
    """

    __tablename__ = "results"

    match_id = db.Column(db.Integer, db.ForeignKey(
        "matches.id"), nullable=False)
    winner_id = db.Column(
        db.Integer, db.ForeignKey("teams.id"), nullable=False)
    loser_id = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    match = db.relationship("Match", backref="results")

    def __init__(self, match_id: int, winner_id: int, loser_id: int, **kwargs):
        db.Model.__init__(
            self, match_id=match_id, winner_id=winner_id, loser_id=loser_id, **kwargs)

    def __repr__(self):
        return "<{}>".format(self.__class__.__name__)

    def to_dict(self):
        return {
            "id": self.id,
            "match_id": self.match_id,
            "winner_id": self.winner_id,
            "loser_id": self.loser_id,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


class Comment(CommonModel, SurrogatePK):
    """
        Comment model:
        - user_id: id of the user
        - tournament_id: id of the tournament
        - message: message of the user
    """

    __tablename__ = "comments"

    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    message = db.Column(db.Text, nullable=False)
    tournament_id = db.Column(db.Integer, db.ForeignKey(
        "tournaments.id"), nullable=False)
    user = db.relationship("User", backref="comments")
    tournament = db.relationship("Tournament", backref="comments")

    def __init__(self, user_id: int, message: str, tournament_id: int, **kwargs):
        db.Model.__init__(self, user_id=user_id, message=message,
                          tournament_id=tournament_id, **kwargs)

    def __repr__(self):
        return "<{}>".format(self.__class__.__name__)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tournament_id": self.tournament_id,
            "message": self.message,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
