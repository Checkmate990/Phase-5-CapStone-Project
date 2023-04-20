import logging
from flask import jsonify, request, Blueprint

from project import db
from project.api.authentications import authenticate
from project.api.validators import field_type_validator, required_validator

from project.models import User, Team

team_blueprint = Blueprint('team', __name__, template_folder='templates')

logger = logging.getLogger(__name__)


@team_blueprint.route('/teams/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': True,
        'message': 'pong!'
    })


@team_blueprint.route('/teams', methods=['GET'])
def get_all_teams():
    """Get all teams"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    teams = Team.query.all()
    teams = [team.to_dict() for team in teams]

    response_object["status"] = True
    response_object["message"] = "Teams fetched successfully."
    response_object["data"] = teams

    return jsonify(response_object), 200


@team_blueprint.route('/teams', methods=['POST'])
@authenticate
def create_team(user_id):
    """Create team"""
    post_data = request.get_json()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "name": str,
            "captain_id": int,
        }

        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        team = Team.query.filter_by(name=post_data["name"]).first()
        if team:
            response_object["message"] = "Team already exists."
            return jsonify(response_object), 200

        captain = User.query.filter_by(id=post_data["captain_id"]).first()
        if not captain:
            response_object["message"] = "Captain does not exist."
            return jsonify(response_object), 200

        team = Team(
            name=post_data["name"],
            captain_id=post_data["captain_id"],
        )

        team.save()

        response_object["status"] = True
        response_object["message"] = "Team created successfully."
        response_object["data"] = team.to_dict()

        return jsonify(response_object), 201

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@team_blueprint.route('/teams/<team_id>', methods=['GET'])
def get_team(team_id):
    """Get team"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    team = Team.query.filter_by(id=team_id).first()
    if not team:
        response_object["message"] = "Team does not exist."
        return jsonify(response_object), 200

    response_object["status"] = True
    response_object["message"] = "Team fetched successfully."
    response_object["data"] = team.to_dict()

    return jsonify(response_object), 200


@team_blueprint.route('/teams/<team_id>', methods=['PUT'])
@authenticate
def update_team(user_id, team_id):
    """Update team"""
    post_data = request.get_json()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "name": str,
            "captain_id": int,
        }

        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        team = Team.query.filter_by(id=team_id).first()
        if not team:
            response_object["message"] = "Team does not exist."
            return jsonify(response_object), 200

        captain = User.query.filter_by(id=post_data["captain_id"]).first()
        if not captain:
            response_object["message"] = "Captain does not exist."
            return jsonify(response_object), 200

        team.update(post_data)

        response_object["status"] = True
        response_object["message"] = "Team updated successfully."
        response_object["data"] = team.to_dict()

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@team_blueprint.route('/teams/<team_id>', methods=['DELETE'])
@authenticate
def delete_team(user_id, team_id):
    """Delete team"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    team = Team.query.filter_by(id=team_id).first()
    if not team:
        response_object["message"] = "Team does not exist."
        return jsonify(response_object), 200

    team.delete()

    response_object["status"] = True
    response_object["message"] = "Team deleted successfully."

    return jsonify(response_object), 200
