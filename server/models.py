from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Team(db.Model):
    __tablename__ = "teams"
    id = Column(Integer, primary_key=True)
    team_name = Column(String, nullable=False)
    players = relationship("Player", backref="team")

class Player(db.Model):
    __tablename__ = "players"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    team_id = Column(Integer, ForeignKey("teams.id"))

class Tournament(db.Model, SerializerMixin):
    __tablename__ = 'tournaments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    participants = db.relationship('User', secondary='user_tournament', back_populates='tournaments')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'location': self.location
        }

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    tournaments = db.relationship('Tournament', secondary='user_tournament', back_populates='participants')

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username
        }

    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'

user_tournament = db.Table('user_tournament',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('tournament_id', db.Integer, db.ForeignKey('tournaments.id'), primary_key=True)
)
