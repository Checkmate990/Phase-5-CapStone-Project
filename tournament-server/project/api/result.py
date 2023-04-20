import logging
from flask import jsonify, request, Blueprint

from project import db
from project.api.authentications import authenticate
from project.api.validators import field_type_validator, required_validator

from project.models import User, Team, Match, Result

result_blueprint = Blueprint('result', __name__, template_folder='templates')

logger = logging.getLogger(__name__)


@result_blueprint.route('/results/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': True,
        'message': 'pong!'
    })


@result_blueprint.route('/results', methods=['GET'])
def get_all_results():
    """Get all results"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    results = Result.query.all()
    results = [result.to_dict() for result in results]

    response_object["status"] = True
    response_object["message"] = "Results fetched successfully."
    response_object["data"] = results

    return jsonify(response_object), 200


@result_blueprint.route('/results', methods=['POST'])
@authenticate
def create_result(user_id):
    """Create result"""
    post_data = request.get_json()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "match_id": int,
            "winner_id": int,
            "loser_id": int
        }
        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        match = Match.query.filter_by(id=post_data["match_id"]).first()
        if not match:
            response_object["message"] = "Match not found."
            return jsonify(response_object), 200

        winner = Team.query.filter_by(id=post_data["winner_id"]).first()
        if not winner:
            response_object["message"] = "Winner team not found."
            return jsonify(response_object), 200

        loser = Team.query.filter_by(id=post_data["loser_id"]).first()
        if not loser:
            response_object["message"] = "Loser team not found."
            return jsonify(response_object), 200

        result = Result(
            match_id=post_data["match_id"],
            winner_id=post_data["winner_id"],
            loser_id=post_data["loser_id"]
        )

        result.save()

        response_object["status"] = True
        response_object["message"] = "Result created successfully."
        response_object["data"] = result.to_dict()

        return jsonify(response_object), 201

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@result_blueprint.route('/results/<result_id>', methods=['GET'])
def get_single_result(result_id):
    """Get single result details"""
    response_object = {
        'status': False,
        'message': 'Result does not exist'
    }
    try:
        result = Result.query.filter_by(id=int(result_id)).first()
        if not result:
            return jsonify(response_object), 200
        else:
            response_object['status'] = True
            response_object['message'] = 'Result fetched successfully.'
            response_object['data'] = result.to_dict()
            return jsonify(response_object), 200

    except Exception as e:
        logger.error(e)
        return jsonify(response_object), 200


@result_blueprint.route('/results/<result_id>', methods=['PUT'])
@authenticate
def update_result(user_id, result_id):
    """Update single result details"""
    response_object = {
        'status': False,
        'message': 'Result does not exist'
    }
    try:
        result = Result.query.filter_by(id=int(result_id)).first()
        if not result:
            return jsonify(response_object), 200
        else:
            post_data = request.get_json()

            field_types = {
                "match_id": int,
                "winner_id": int,
                "loser_id": int
            }
            required_fields = list(field_types.keys())

            post_data = field_type_validator(post_data, field_types)
            required_validator(post_data, required_fields)

            match = Match.query.filter_by(id=post_data["match_id"]).first()
            if not match:
                response_object["message"] = "Match not found."
                return jsonify(response_object), 200

            winner = Team.query.filter_by(id=post_data["winner_id"]).first()
            if not winner:
                response_object["message"] = "Winner team not found."
                return jsonify(response_object), 200

            loser = Team.query.filter_by(id=post_data["loser_id"]).first()
            if not loser:
                response_object["message"] = "Loser team not found."
                return jsonify(response_object), 200

            result.update(post_data)

            response_object["status"] = True
            response_object["message"] = "Result updated successfully."
            response_object["data"] = result.to_dict()

            return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@result_blueprint.route('/results/<result_id>', methods=['DELETE'])
@authenticate
def delete_result(user_id, result_id):
    """Delete single result"""
    response_object = {
        'status': False,
        'message': 'Result does not exist'
    }
    try:
        result = Result.query.filter_by(id=int(result_id)).first()
        if not result:
            return jsonify(response_object), 200
        else:
            result.delete()

            response_object["status"] = True
            response_object["message"] = "Result deleted successfully."

            return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200
