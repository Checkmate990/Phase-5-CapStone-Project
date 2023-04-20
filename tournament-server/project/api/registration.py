import logging
from flask import jsonify, request, Blueprint

from project import db
from project.api.authentications import authenticate
from project.api.validators import field_type_validator, required_validator

from project.models import User, Team, Tournament, Registration

registration_blueprint = Blueprint(
    'registration', __name__, template_folder='templates')

logger = logging.getLogger(__name__)


@registration_blueprint.route('/registrations/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': True,
        'message': 'pong!'
    })


@registration_blueprint.route('/registrations', methods=['GET'])
def get_all_registrations():
    """Get all registrations"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    registrations = Registration.query.all()
    registrations = [registration.to_dict() for registration in registrations]

    response_object["status"] = True
    response_object["message"] = "Registrations fetched successfully."
    response_object["data"] = registrations

    return jsonify(response_object), 200


@registration_blueprint.route('/registrations', methods=['POST'])
@authenticate
def create_registration(user_id):
    """Create registration"""
    post_data = request.get_json()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "team_id": int,
            "tournament_id": int,
            "user_id": int
        }
        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        team = Team.query.filter_by(id=post_data["team_id"]).first()
        tournament = Tournament.query.filter_by(
            id=post_data["tournament_id"]).first()
        user = User.query.filter_by(id=post_data["user_id"]).first()

        if not team:
            response_object["message"] = "Team not found."
            return jsonify(response_object), 200

        if not tournament:
            response_object["message"] = "Tournament not found."
            return jsonify(response_object), 200

        if not user:
            response_object["message"] = "User not found."
            return jsonify(response_object), 200

        registration = Registration.query.filter_by(
            team_id=post_data["team_id"],
            tournament_id=post_data["tournament_id"],
            user_id=post_data["user_id"]
        ).first()

        if registration:
            response_object["message"] = "Registration already exists."
            return jsonify(response_object), 200

        registration = Registration(
            team_id=post_data["team_id"],
            tournament_id=post_data["tournament_id"],
            user_id=post_data["user_id"]
        )

        registration.save()

        response_object["status"] = True
        response_object["message"] = "Registration created successfully."
        response_object["data"] = registration.to_dict()

        return jsonify(response_object), 201

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@registration_blueprint.route('/registrations/<registration_id>', methods=['GET'])
def get_single_registration(registration_id):
    """Get single registration details"""
    response_object = {
        'status': False,
        'message': 'Registration does not exist'
    }

    try:
        registration = Registration.query.filter_by(id=registration_id).first()

        if not registration:
            return jsonify(response_object), 200

        response_object["status"] = True
        response_object["message"] = "Registration fetched successfully."
        response_object["data"] = registration.to_dict()

        return jsonify(response_object), 200

    except Exception as e:
        logger.error(e)
        return jsonify(response_object), 200


@registration_blueprint.route('/registrations/<registration_id>', methods=['PUT'])
@authenticate
def update_registration(user_id, registration_id):
    """Update single registration details"""
    post_data = request.get_json()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "team_id": int,
            "tournament_id": int,
            "user_id": int
        }
        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        registration = Registration.query.filter_by(id=registration_id).first()

        if not registration:
            response_object["message"] = "Registration does not exist."
            return jsonify(response_object), 200

        team = Team.query.filter_by(id=post_data["team_id"]).first()
        tournament = Tournament.query.filter_by(
            id=post_data["tournament_id"]).first()
        user = User.query.filter_by(id=post_data["user_id"]).first()

        if not team:
            response_object["message"] = "Team not found."
            return jsonify(response_object), 200

        if not tournament:
            response_object["message"] = "Tournament not found."
            return jsonify(response_object), 200

        if not user:
            response_object["message"] = "User not found."
            return jsonify(response_object), 200

        registration.update(post_data)

        response_object["status"] = True
        response_object["message"] = "Registration updated successfully."
        response_object["data"] = registration.to_dict()

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@registration_blueprint.route('/registrations/<registration_id>', methods=['DELETE'])
@authenticate
def delete_registration(user_id, registration_id):
    """Delete single registration"""
    response_object = {
        'status': False,
        'message': 'Registration does not exist'
    }

    try:
        registration = Registration.query.filter_by(id=registration_id).first()

        if not registration:
            return jsonify(response_object), 200

        registration.delete()

        response_object["status"] = True
        response_object["message"] = "Registration deleted successfully."

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200
