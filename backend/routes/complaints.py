# from flask import Blueprint, request, jsonify, session
# from extensions import mysql

# from utils import insert_audit_log
# import json

# complaints_bp = Blueprint('complaints', __name__)

# @complaints_bp.route('/complaints', methods=['POST'])
# def create_complaint():
#     if 'user_id' not in session: return jsonify({'error':'Login required'}),401
#     data = request.get_json()
#     user_id = session['user_id']
#     title, description = data.get('title'), data.get('description')
#     status = 'Open'
#     cursor = mysql.connection.cursor()
#     try:
#         cursor.execute(
#             "INSERT INTO complaints (user_id,title,description,status,deleted,created_at) VALUES (%s,%s,%s,%s,%s,NOW())",
#             (user_id,title,description,status,0)
#         )
#         mysql.connection.commit()
#         complaint_id = cursor.lastrowid
#         insert_audit_log(user_id,'CREATE','Complaint',complaint_id,None,{'title':title,'description':description})
#         return jsonify({'message':'Complaint created successfully'})
#     except Exception as e:
#         return jsonify({'error': str(e)}),400

# @complaints_bp.route('/complaints', methods=['GET'])
# def get_complaints():
#     cursor = mysql.connection.cursor()
#     if session.get('role') == 'Admin':
#         cursor.execute("SELECT id,user_id,title,description,status,deleted,created_at FROM complaints WHERE deleted=0")
#     else:
#         cursor.execute("SELECT id,user_id,title,description,status,deleted,created_at FROM complaints WHERE user_id=%s AND deleted=0",(session['user_id'],))
#     complaints = cursor.fetchall()
#     return jsonify([{'id': c[0], 'user_id': c[1], 'title': c[2], 'description': c[3], 'status': c[4], 'deleted': c[5], 'created_at': c[6]} for c in complaints])
# @complaints_bp.route('/complaints/<int:id>', methods=['PUT'])
# def update_complaint(id):
#     if 'user_id' not in session:
#         return jsonify({'error':'Login required'}), 401

#     data = request.get_json()
#     status = data.get('status')
#     if not status:
#         return jsonify({'error': 'Status is required'}), 400

#     cursor = mysql.connection.cursor()
#     cursor.execute("SELECT id,status FROM complaints WHERE id=%s", (id,))
#     complaint = cursor.fetchone()
#     if not complaint:
#         return jsonify({'error':'Complaint not found'}), 404

#     old_status = complaint[1]
#     try:
#         cursor.execute("UPDATE complaints SET status=%s WHERE id=%s", (status, id))
#         mysql.connection.commit()
#         insert_audit_log(session['user_id'], 'UPDATE_STATUS', 'Complaint', id, {'status': old_status}, {'status': status})
#         return jsonify({'message':'Status updated successfully'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
# @complaints_bp.route('/complaints/<int:id>', methods=['DELETE'])
# def delete_complaint(id):
#     if 'user_id' not in session:
#         return jsonify({'error':'Login required'}), 401

#     cursor = mysql.connection.cursor()
#     cursor.execute("SELECT id, title, description FROM complaints WHERE id=%s", (id,))
#     complaint = cursor.fetchone()
#     if not complaint:
#         return jsonify({'error':'Complaint not found'}), 404

#     try:
#         cursor.execute("UPDATE complaints SET deleted=1 WHERE id=%s", (id,))
#         mysql.connection.commit()
#         insert_audit_log(session['user_id'], 'DELETE', 'Complaint', id,
#                          {'title': complaint[1], 'description': complaint[2]}, None)
#         return jsonify({'message':'Complaint deleted successfully'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


from flask import Blueprint, request, jsonify, session, current_app
from extensions import mysql
from utils import insert_audit_log
import json

complaints_bp = Blueprint('complaints', __name__)

@complaints_bp.route('/complaints', methods=['POST'])
def create_complaint():
    if 'user_id' not in session:
        current_app.logger.warning("Unauthorized complaint creation attempt")
        return jsonify({'error':'Login required'}),401

    data = request.get_json()
    user_id = session['user_id']
    title, description = data.get('title'), data.get('description')
    status = 'Open'
    cursor = mysql.connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO complaints (user_id,title,description,status,deleted,created_at) VALUES (%s,%s,%s,%s,%s,NOW())",
            (user_id,title,description,status,0)
        )
        mysql.connection.commit()
        complaint_id = cursor.lastrowid
        insert_audit_log(user_id,'CREATE','Complaint',complaint_id,None,{'title':title,'description':description})
        current_app.logger.info(f"Complaint created by user {user_id}: {title}")
        return jsonify({'message':'Complaint created successfully'})
    except Exception as e:
        current_app.logger.error(f"Error creating complaint by user {user_id}: {e}")
        return jsonify({'error': str(e)}),400


@complaints_bp.route('/complaints', methods=['GET'])
def get_complaints():
    cursor = mysql.connection.cursor()
    try:
        if session.get('role') == 'Admin':
            cursor.execute("SELECT id,user_id,title,description,status,deleted,created_at FROM complaints WHERE deleted=0")
        else:
            cursor.execute("SELECT id,user_id,title,description,status,deleted,created_at FROM complaints WHERE user_id=%s AND deleted=0",(session['user_id'],))
        complaints = cursor.fetchall()
        current_app.logger.info(f"Complaints retrieved by user {session.get('user_id')}")
        return jsonify([{'id': c[0], 'user_id': c[1], 'title': c[2], 'description': c[3], 'status': c[4], 'deleted': c[5], 'created_at': c[6]} for c in complaints])
    except Exception as e:
        current_app.logger.error(f"Error fetching complaints for user {session.get('user_id')}: {e}")
        return jsonify({'error': str(e)}), 500


@complaints_bp.route('/complaints/<int:id>', methods=['PUT'])
def update_complaint(id):
    if 'user_id' not in session:
        current_app.logger.warning(f"Unauthorized complaint update attempt for complaint {id}")
        return jsonify({'error':'Login required'}), 401

    data = request.get_json()
    status = data.get('status')
    if not status:
        return jsonify({'error': 'Status is required'}), 400

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id,status FROM complaints WHERE id=%s", (id,))
    complaint = cursor.fetchone()
    if not complaint:
        current_app.logger.warning(f"Complaint {id} not found for update")
        return jsonify({'error':'Complaint not found'}), 404

    old_status = complaint[1]
    try:
        cursor.execute("UPDATE complaints SET status=%s WHERE id=%s", (status, id))
        mysql.connection.commit()
        insert_audit_log(session['user_id'], 'UPDATE_STATUS', 'Complaint', id, {'status': old_status}, {'status': status})
        current_app.logger.info(f"Complaint {id} status updated by user {session['user_id']} from {old_status} to {status}")
        return jsonify({'message':'Status updated successfully'}), 200
    except Exception as e:
        current_app.logger.error(f"Error updating complaint {id} by user {session['user_id']}: {e}")
        return jsonify({'error': str(e)}), 500


@complaints_bp.route('/complaints/<int:id>', methods=['DELETE'])
def delete_complaint(id):
    if 'user_id' not in session:
        current_app.logger.warning(f"Unauthorized complaint delete attempt for complaint {id}")
        return jsonify({'error':'Login required'}), 401

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, title, description FROM complaints WHERE id=%s", (id,))
    complaint = cursor.fetchone()
    if not complaint:
        current_app.logger.warning(f"Complaint {id} not found for deletion")
        return jsonify({'error':'Complaint not found'}), 404

    try:
        cursor.execute("UPDATE complaints SET deleted=1 WHERE id=%s", (id,))
        mysql.connection.commit()
        insert_audit_log(session['user_id'], 'DELETE', 'Complaint', id,
                         {'title': complaint[1], 'description': complaint[2]}, None)
        current_app.logger.info(f"Complaint {id} deleted by user {session['user_id']}")
        return jsonify({'message':'Complaint deleted successfully'}), 200
    except Exception as e:
        current_app.logger.error(f"Error deleting complaint {id} by user {session['user_id']}: {e}")
        return jsonify({'error': str(e)}), 500
