import logging
from datetime import datetime
from flask import jsonify, request, Blueprint

from project import db
from project.api.upload import upload
from project.api.authentications import authenticate
from project.api.validators import field_type_validator, required_validator

from project.models import Tournament

tournament_blueprint = Blueprint(
    'tournament', __name__, template_folder='templates')

logger = logging.getLogger(__name__)


@tournament_blueprint.route('/tournaments/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': True,
        'message': 'pong!'
    })


@tournament_blueprint.route('/tournaments', methods=['GET'])
def get_all_tournaments():
    """Get all tournaments"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    tournaments = Tournament.query.all()
    tournaments = [tournament.to_dict() for tournament in tournaments]

    response_object["status"] = True
    response_object["message"] = "Tournaments fetched successfully."
    response_object["data"] = tournaments

    return jsonify(response_object), 200


@tournament_blueprint.route('/tournaments', methods=['POST'])
#@authenticate
@upload
def create_tournament(file):
    """Create tournament"""
    post_data = request.form.to_dict()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "name": str,
            "description": str,
            "start_date": str,
            "end_date": str,
            "location": str,
        }

        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        tournament = Tournament(
            name=post_data.get('name'),
            description=post_data.get('description'),
            start_date=datetime.strptime(
                post_data.get('start_date'), '%Y-%m-%d'),
            end_date=datetime.strptime(
                post_data.get('end_date'), '%Y-%m-%d'),
            location=post_data.get('location'),
            image_url=file
        )

        tournament.save()

        response_object["status"] = True
        response_object["message"] = "Tournament created successfully."
        response_object["data"] = tournament.to_dict()

        return jsonify(response_object), 201

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@tournament_blueprint.route('/tournaments/<tournament_id>', methods=['GET'])
def get_tournament(tournament_id):
    """Get tournament"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    tournament = Tournament.query.filter_by(id=int(tournament_id)).first()

    if not tournament:
        response_object["message"] = "Tournament does not exist."
        return jsonify(response_object), 200

    response_object["status"] = True
    response_object["message"] = "Tournament fetched successfully."
    response_object["data"] = tournament.to_dict()

    return jsonify(response_object), 200


@tournament_blueprint.route('/tournaments/<tournament_id>', methods=['PUT'])
@authenticate
def update_tournament(user_id, tournament_id):
    """Update tournament"""
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
            "description": str,
            "start_date": str,
            "end_date": str,
            "location": str,
        }

        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        tournament = Tournament.query.filter_by(id=int(tournament_id)).first()

        if not tournament:
            response_object["message"] = "Tournament does not exist."
            return jsonify(response_object), 200

        tournament.update(post_data)

        response_object["status"] = True
        response_object["message"] = "Tournament updated successfully."
        response_object["data"] = tournament.to_dict()

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@tournament_blueprint.route('/tournaments/<tournament_id>', methods=['DELETE'])
@authenticate
def delete_tournament(user_id, tournament_id):
    """Delete tournament"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    tournament = Tournament.query.filter_by(id=int(tournament_id)).first()

    if not tournament:
        response_object["message"] = "Tournament does not exist."
        return jsonify(response_object), 200

    tournament.delete()

    response_object["status"] = True
    response_object["message"] = "Tournament deleted successfully."

    return jsonify(response_object), 200
