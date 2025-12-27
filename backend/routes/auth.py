# from flask import Blueprint, request, jsonify, session
# from extensions import mysql
# from utils import insert_audit_log
# import bcrypt

# auth_bp = Blueprint('auth', __name__)

# @auth_bp.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     name, email, password, role = data.get('name'), data.get('email'), data.get('password'), data.get('role')
#     sec_q, sec_a = data.get('security_question'), data.get('security_answer')
#     password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
#     cursor = mysql.connection.cursor()
#     try:
#         cursor.execute(
#             "INSERT INTO users (name,email,password_hash,role,security_question,security_answer) VALUES (%s,%s,%s,%s,%s,%s)",
#             (name, email, password_hash, role, sec_q, sec_a)
#         )
#         mysql.connection.commit()
#         return jsonify({'message': 'Registration successful'})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400


# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email, password = data.get('email'), data.get('password')
#     cursor = mysql.connection.cursor()
#     cursor.execute("SELECT id,password_hash,role FROM users WHERE email=%s", (email,))
#     user = cursor.fetchone()

#     if user and bcrypt.checkpw(password.encode('utf-8'), user[1].encode('utf-8')):
#         session['user_id'], session['role'] = user[0], user[2]
#         # ✅ Log login action, resource_id is None
#         session.permanent = True
#         insert_audit_log(user[0], 'LOGIN', 'User', resource_id=None)
#         return jsonify({'message': 'Login successful', 'role': user[2]})

#     return jsonify({'error': 'Invalid credentials'}), 401


# @auth_bp.route('/logout', methods=['POST'])
# def logout():
#     user_id = session.get('user_id')
#     if user_id:
#         # ✅ Log logout action, resource_id is None
#         insert_audit_log(user_id, 'LOGOUT', 'User', resource_id=None)
#     session.clear()
#     return jsonify({'message': 'Logged out successfully'})


# @auth_bp.route('/validate-session', methods=['GET'])
# def validate_session():
#     if 'user_id' in session:
#         return jsonify({'logged_in': True, 'user_id': session['user_id'], 'role': session['role']})
#     return jsonify({'logged_in': False}), 401


from flask import Blueprint, request, jsonify, session, current_app
from extensions import mysql
from utils import insert_audit_log
import bcrypt

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name, email, password, role = data.get('name'), data.get('email'), data.get('password'), data.get('role')
    sec_q, sec_a = data.get('security_question'), data.get('security_answer')
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    cursor = mysql.connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (name,email,password_hash,role,security_question,security_answer) VALUES (%s,%s,%s,%s,%s,%s)",
            (name, email, password_hash, role, sec_q, sec_a)
        )
        mysql.connection.commit()
        current_app.logger.info(f"New user registered: {email} with role {role}")
        return jsonify({'message': 'Registration successful'})
    except Exception as e:
        current_app.logger.error(f"Error during registration for {email}: {e}")
        return jsonify({'error': str(e)}), 400


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data.get('email'), data.get('password')
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id,password_hash,role FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()

    if user and bcrypt.checkpw(password.encode('utf-8'), user[1].encode('utf-8')):
        session['user_id'], session['role'] = user[0], user[2]
        session.permanent = True
        insert_audit_log(user[0], 'LOGIN', 'User', resource_id=None)
        current_app.logger.info(f"User logged in: {email} with role {user[2]}")
        return jsonify({'message': 'Login successful', 'role': user[2]})

    current_app.logger.warning(f"Failed login attempt for email: {email}")
    return jsonify({'error': 'Invalid credentials'}), 401


@auth_bp.route('/logout', methods=['POST'])
def logout():
    user_id = session.get('user_id')
    if user_id:
        insert_audit_log(user_id, 'LOGOUT', 'User', resource_id=None)
        current_app.logger.info(f"User logged out: {user_id}")
    session.clear()
    return jsonify({'message': 'Logged out successfully'})


@auth_bp.route('/validate-session', methods=['GET'])
def validate_session():
    if 'user_id' in session:
        current_app.logger.info(f"Session validated for user: {session['user_id']}")
        return jsonify({'logged_in': True, 'user_id': session['user_id'], 'role': session['role']})
    
    current_app.logger.warning("Unauthorized session validation attempt")
    return jsonify({'logged_in': False}), 401
