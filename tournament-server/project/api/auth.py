import logging
from flask import jsonify, request, Blueprint

from project import db
from project.api.authentications import authenticate
from project.api.validators import email_validator, field_type_validator, required_validator

from project.models import Role, User, BlacklistToken

auth_blueprint = Blueprint('auth', __name__, template_folder='templates')
logger = logging.getLogger(__name__)


@auth_blueprint.route('/users/auth/access_token', methods=['GET'])
@authenticate
def get_access_token(user_id):
    """Get access token"""
    user = User.query.filter_by(id=int(user_id)).first()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    auth_token = user.encode_auth_token(user.id)
    if auth_token:
        response_object["status"] = True
        response_object["message"] = "Access token generated successfully."
        response_object["data"] = {
            "id": user.id,
            "role": user.role.name,
            "auth_token": auth_token.decode('utf-8')
        }

        return jsonify(response_object), 200


@auth_blueprint.route('/users/auth/login', methods=['POST'])
def login():
    """Login user"""
    post_data = request.get_json()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    try:
        field_types = {
            "email": str,
            "password": str,
        }

        required_fields = list(field_types.keys())

        post_data = field_type_validator(post_data, field_types)
        required_validator(post_data, required_fields)

        email = post_data.get('email')
        password = post_data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user:
            response_object['message'] = 'Email or password is incorrect.'
            return jsonify(response_object), 200

        if user.check_password(password):
            if user.is_suspended:
                response_object['message'] = 'Account is suspended by admin.'
                return jsonify(response_object), 200

            auth_token = user.encode_auth_token(user.id)
            if auth_token:
                response_object["status"] = True
                response_object["message"] = "User logged in successfully."
                response_object["data"] = {
                    "id": user.id,
                    "role": user.role.name,
                    "auth_token": auth_token.decode('utf-8'),
                    "firstname":user.firstname
                }

                return jsonify(response_object), 200

        else:
            response_object['message'] = 'Email or password is incorrect.'
            return jsonify(response_object), 200

    except Exception as e:
        logger.error(e)
        response_object['message'] = 'Try again: ' + str(e)
        return jsonify(response_object), 200


@auth_blueprint.route('/users/auth/logout', methods=['GET'])
@authenticate
def logout(user_id):
    """Logout user"""

    try:
        # get auth token
        auth_header = request.headers.get('Authorization')
        auth_token = auth_header.split(" ")[1]

        # blacklist token
        blacklist_token = BlacklistToken(token=auth_token)
        blacklist_token.insert()

        response_object = {
            'status': True,
            'message': 'User logged out successfully.'
        }
        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        response_object = {
            'status': False,
            'message': str(e)
        }
        return jsonify(response_object), 200


@auth_blueprint.route('/users/auth/register', methods=['POST'])
def register():
    post_data = request.get_json()

    response_object = {
        'status': False,
        'message': 'Invalid payload.'
    }

    if not post_data:
        return jsonify(response_object), 200

    field_types = {
        "firstname": str, "lastname": str,
        "email": str, "password": str, "role": str
    }

    post_data = field_type_validator(post_data, field_types)
    required_fields = list(field_types.keys())
    required_fields.remove("role")

    # verify role
    role = post_data.get('role')
    role = str(role).upper() if role else None
    if role and role not in Role.__members__:
        response_object['message'] = 'Invalid role {}.'.format(role)
        return jsonify(response_object), 200

    required_validator(post_data, required_fields)
    email_validator(post_data["email"])

    firstname = post_data.get('firstname')
    lastname = post_data.get('lastname')
    email = post_data.get('email')
    password = post_data.get('password')

    try:
        user = User.query.filter_by(email=email).first()
        if user:
            response_object['message'] = 'Email already exists.'
            return jsonify(response_object), 200

        new_user = User(
            firstname=firstname,
            lastname=lastname,
            email=email,
            password=password,
            role=Role[role] if role else Role.USER
        )

        new_user.save()

        auth_token = new_user.encode_auth_token(new_user.id)

        response_object['status'] = True
        response_object['message'] = 'Successfully registered as {}.'.format(
            role)
        response_object['data'] = {
            'id': new_user.id,
            "role": new_user.role.name,
            'auth_token': auth_token.decode('utf-8'),
            "firstname":new_user.firstname
        }

        return jsonify(response_object), 200

    except Exception as e:
        db.session.rollback()
        logger.error(e)
        response_object['message'] = 'Try again: {}'.format(str(e))
        return jsonify(response_object), 200


@auth_blueprint.route('/users/auth/status', methods=['GET'])
@authenticate
def get_user_status(user_id):
    """Get user status"""
    user = User.query.filter_by(id=int(user_id)).first()

    response_object = {
        'status': False,
        'message': 'User not found.'
    }

    if user:
        response_object['status'] = True
        response_object['message'] = 'User status.'
        response_object['data'] = {
            'active': user.is_active,
            'role': user.role.name,
        }

    return jsonify(response_object), 200
