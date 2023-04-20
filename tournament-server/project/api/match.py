import logging
from flask import jsonify, request, Blueprint

from project import db
from project.api.authentications import authenticate
from project.api.validators import field_type_validator, required_validator

from project.models import Team, Tournament, Match

match_blueprint = Blueprint('match', __name__, template_folder='templates')

logger = logging.getLogger(__name__)


@match_blueprint.route('/matches/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': True,
        'message': 'pong!'
    })


@match_blueprint.route('/matches', methods=['GET'])
def get_all_matches():
    """Get all matches"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    matches = Match.query.all()
    matches = [match.to_dict() for match in matches]

    response_object["status"] = True
    response_object["message"] = "Matches fetched successfully."
    response_object["data"] = matches

    return jsonify(response_object), 200


@match_blueprint.route('/matches', methods=['POST'])
@authenticate
def create_match(user_id):
    """Create match"""
    post_data = request.get_json()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "tournament_id": int,
            "team1_id": int,
            "team2_id": int,
            "match_date": str,
            "match_time": str,
        }
        required_fields = list(field_types.keys())

        field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        tournament_id = post_data.get("tournament_id")
        team1_id = post_data.get("team1_id")
        team2_id = post_data.get("team2_id")
        match_date = post_data.get("match_date")
        match_time = post_data.get("match_time")

        tournament = Tournament.query.filter_by(id=tournament_id).first()
        team1 = Team.query.filter_by(id=team1_id).first()
        team2 = Team.query.filter_by(id=team2_id).first()

        if not tournament:
            response_object["message"] = "Tournament not found."
            return jsonify(response_object), 200

        if not team1:
            response_object["message"] = "Team 1 not found."
            return jsonify(response_object), 200

        if not team2:
            response_object["message"] = "Team 2 not found."
            return jsonify(response_object), 200

        match = Match(
            tournament_id=tournament_id,
            team1_id=team1_id,
            team2_id=team2_id,
            match_date=match_date,
            match_time=match_time,
        )

        match.save()

        response_object["status"] = True
        response_object["message"] = "Match created successfully."
        response_object["data"] = match.to_dict()

        return jsonify(response_object), 201

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@match_blueprint.route('/matches/<match_id>', methods=['GET'])
def get_single_match(match_id):
    """Get single match details"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    try:
        match = Match.query.filter_by(id=match_id).first()

        if not match:
            response_object["message"] = "Match not found."
            return jsonify(response_object), 200

        response_object["status"] = True
        response_object["message"] = "Match fetched successfully."
        response_object["data"] = match.to_dict()

        return jsonify(response_object), 200

    except Exception as e:
        logger.error(e)
        return jsonify(response_object), 200


@match_blueprint.route('/matches/<match_id>', methods=['PUT'])
@authenticate
def update_match(user_id, match_id):
    """Update match"""
    post_data = request.get_json()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "tournament_id": int,
            "team1_id": int,
            "team2_id": int,
            "match_date": str,
            "match_time": str,
        }
        required_fields = list(field_types.keys())

        field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        tournament_id = post_data.get("tournament_id")
        team1_id = post_data.get("team1_id")
        team2_id = post_data.get("team2_id")
        match_date = post_data.get("match_date")
        match_time = post_data.get("match_time")

        tournament = Tournament.query.filter_by(id=tournament_id).first()
        team1 = Team.query.filter_by(id=team1_id).first()
        team2 = Team.query.filter_by(id=team2_id).first()

        if not tournament:
            response_object["message"] = "Tournament not found."
            return jsonify(response_object), 200

        if not team1:
            response_object["message"] = "Team 1 not found."
            return jsonify(response_object), 200

        if not team2:
            response_object["message"] = "Team 2 not found."
            return jsonify(response_object), 200

        match = Match.query.filter_by(id=match_id).first()

        if not match:
            response_object["message"] = "Match not found."
            return jsonify(response_object), 200

        match.update(post_data)

        response_object["status"] = True
        response_object["message"] = "Match updated successfully."
        response_object["data"] = match.to_dict()

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@match_blueprint.route('/matches/<match_id>', methods=['DELETE'])
@authenticate
def delete_match(user_id, match_id):
    """Delete match"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    try:
        match = Match.query.filter_by(id=match_id).first()

        if not match:
            response_object["message"] = "Match not found."
            return jsonify(response_object), 200

        match.delete()

        response_object["status"] = True
        response_object["message"] = "Match deleted successfully."

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200
