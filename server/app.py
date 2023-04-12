#!/usr/bin/env python3
from database import db
from flask import Flask, request, jsonify, make_response, session
from flask_migrate import Migrate
from models import Player, Team, Tournament, User
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource
from config import app, db, api

app = Flask(__name__)
db.init_app(app)


class ClearSession(Resource):
    def delete(self):
        session['page_views'] = None
        session['user_id'] = None
        return {}, 204

# ... Keep the Signup, Login, Logout, and CheckSession classes as they are

class Tournaments(Resource):
    def get(self):
        tournaments_all = [tournament.to_dict() for tournament in Tournament.query.all()]
        response = make_response(
            jsonify(tournaments_all),
            200,
        )
        return response

    def post(self):
        new_tournament = Tournament(
            name=request.get_json()['name'],
            start_date=request.get_json()['start_date'],
            end_date=request.get_json()['end_date'],
            location=request.get_json()['location'],
        )

        db.session.add(new_tournament)
        db.session.commit()

        response_dict = new_tournament.to_dict()

        response = make_response(
            jsonify(response_dict),
            201,
        )

        return response

class RegisterTournament(Resource):
    def post(self):
        tournament_id = request.get_json()['tournament_id']
        user_id = session.get('user_id')

        if not user_id:
            return {'error': '401 Unauthorized'}, 401

        tournament = Tournament.query.get(tournament_id)
        user = User.query.get(user_id)

        if tournament and user:
            tournament.participants.append(user)
            db.session.commit()
            return {"message": "Successfully registered for the tournament"}, 200
        else:
            return {'error': '404 Not Found'}, 404
        
        

class Signup(Resource):
    def post(self):
        new_user = User(
            username=request.get_json()['username']
        )
        new_user.password_hash = request.get_json()['password']

        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id
        return {"message": "Successfully signed up"}, 201

class Login(Resource):
    def post(self):
        user = User.query.filter_by(username=request.get_json()['username']).first()
        if user and user.authenticate(request.get_json()['password']):
            session['user_id'] = user.id
            return {"message": "Successfully logged in"}, 200
        else:
            return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
    def post(self):
        session['user_id'] = None
        return {"message": "Successfully logged out"}, 200

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            return user.to_dict(), 200
        else:
            return {'error': '401 Unauthorized'}, 401


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Tournaments, '/tournaments', endpoint='tournaments')
api.add_resource(RegisterTournament, '/register_tournament', endpoint='register_tournament')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
