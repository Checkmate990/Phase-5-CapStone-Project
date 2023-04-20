import logging
from flask import jsonify, request, Blueprint

from project import db
from project.api.authentications import authenticate
from project.api.validators import field_type_validator, required_validator

from project.models import User, Tournament, Comment

comment_blueprint = Blueprint('comment', __name__, template_folder='templates')

logger = logging.getLogger(__name__)


@comment_blueprint.route('/comments/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': True,
        'message': 'pong!'
    })


@comment_blueprint.route('/comments', methods=['GET'])
def get_all_comments():
    """Get all comments"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    comments = Comment.query.all()
    comments = [comment.to_dict() for comment in comments]

    for comment in comments:
        user = User.query.filter_by(id=comment["user_id"]).first()
        comment["user"] = user.to_dict()

    response_object["status"] = True
    response_object["message"] = "Comments fetched successfully."
    response_object["data"] = comments

    return jsonify(response_object), 200


@comment_blueprint.route('/comments', methods=['POST'])
@authenticate
def create_comment(user_id):
    """Create comment"""
    post_data = request.get_json()
    print(post_data)

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "tournament_id": int,
            "message": str
        }
        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        tournament_id = post_data.get("tournament_id")
        message = post_data.get("message")

        tournament = Tournament.query.filter_by(id=tournament_id).first()
        user = User.query.filter_by(id=user_id).first()

        if not tournament:
            response_object["message"] = "Tournament does not exist."
            return jsonify(response_object), 200

        if not user:
            response_object["message"] = "User does not exist."
            return jsonify(response_object), 200

        new_comment = Comment(
            tournament_id=tournament_id,
            user_id=user_id,
            message=message
        )

        new_comment.save()

        response_object["status"] = True
        response_object["message"] = "Comment created successfully."
        response_object["data"] = new_comment.to_dict()

        return jsonify(response_object), 201

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@comment_blueprint.route('/comments/<comment_id>', methods=['GET'])
def get_single_comment(comment_id):
    """Get single comment details"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    try:
        comment = Comment.query.filter_by(id=comment_id).first()

        if not comment:
            response_object["message"] = "Comment does not exist."
            return jsonify(response_object), 200

        response_object["status"] = True
        response_object["message"] = "Comment fetched successfully."
        response_object["data"] = comment.to_dict()

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@comment_blueprint.route('/comments/tournament/<tournament_id>', methods=['GET'])
def get_all_comments_by_tournament(tournament_id):
    """Get all comments by tournament"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    """
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    """

    try:
        tournament = Tournament.query.filter_by(id=tournament_id).first()

        if not tournament:
            response_object["message"] = "Tournament does not exist."
            return jsonify(response_object), 200

        comments = Comment.query.filter_by(tournament_id=tournament_id).all()
        comments = [comment.to_dict() for comment in comments]

        for comment in comments:
            user = User.query.filter_by(id=comment["user_id"]).first()
            comment["user"] = user.to_dict()

        response_object["status"] = True
        response_object["message"] = "Comments fetched successfully."
        response_object["data"] = comments

        return jsonify(response_object), 200

    except Exception as e:
        logger.error(e)
        return jsonify(response_object), 200


@comment_blueprint.route('/comments/<comment_id>', methods=['PUT'])
@authenticate
def update_comment(user_id, comment_id):
    """Update comment"""
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
            "message": str
        }
        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        tournament_id = post_data.get("tournament_id")

        tournament = Tournament.query.filter_by(id=tournament_id).first()

        if not tournament:
            response_object["message"] = "Tournament does not exist."
            return jsonify(response_object), 200

        comment = Comment.query.filter_by(id=comment_id).first()
        if not comment:
            response_object["message"] = "Comment does not exist."
            return jsonify(response_object), 200

        comment.update(post_data)

        response_object["status"] = True
        response_object["message"] = "Comment updated successfully."
        response_object["data"] = comment.to_dict()

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200


@comment_blueprint.route('/comments/<comment_id>', methods=['DELETE'])
@authenticate
def delete_comment(user_id, comment_id):
    """Delete comment"""
    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    try:
        comment = Comment.query.filter_by(id=comment_id).first()

        if not comment:
            response_object["message"] = "Comment does not exist."
            return jsonify(response_object), 200

        comment.delete()

        response_object["status"] = True
        response_object["message"] = "Comment deleted successfully."

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        return jsonify(response_object), 200
