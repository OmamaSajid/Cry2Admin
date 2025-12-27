from flask import Blueprint, jsonify, request, session
from utils import insert_audit_log
import json
from extensions import mysql
from flask import send_file
import os


admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/users', methods=['GET'])
def list_users():
    if session.get('role') != 'Admin':
        return jsonify({'error':'Access Denied'}), 403
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id,name,email,role FROM users")
    users = cursor.fetchall()
    return jsonify([{'id': u[0], 'name': u[1], 'email': u[2], 'role': u[3]} for u in users])

@admin_bp.route('/admin/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    if session.get('role') != 'Admin':
        return jsonify({'error':'Access Denied'}), 403
    role = request.get_json().get('role')
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id,role FROM users WHERE id=%s", (user_id,))
    user = cursor.fetchone()
    if not user: return jsonify({'error':'User not found'}),404
    old_role = user[1]
    cursor.execute("UPDATE users SET role=%s WHERE id=%s", (role,user_id))
    mysql.connection.commit()
    insert_audit_log(session['user_id'],'UPDATE_ROLE','User',user_id,{'role': old_role},{'role': role})
    return jsonify({'message':'User role updated successfully'})

@admin_bp.route('/admin/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if session.get('role') != 'Admin':
        return jsonify({'error':'Access Denied'}), 403
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id,name,email,role FROM users WHERE id=%s", (user_id,))
    user = cursor.fetchone()
    if not user: return jsonify({'error':'User not found'}),404
    cursor.execute("DELETE FROM users WHERE id=%s", (user_id,))
    mysql.connection.commit()
    insert_audit_log(session['user_id'],'DELETE','User',user_id,{'name':user[1],'email':user[2],'role':user[3]}, None)
    return jsonify({'message':'User deleted successfully'})
@admin_bp.route('/admin/download-logs', methods=['GET'])
def download_logs():
    # Only admin can download
    if session.get("role") != "Admin":
        return jsonify({"error": "Access Denied"}), 403

    log_path = os.path.join(os.getcwd(), "logs/server.log")
    if not os.path.exists(log_path):
        return jsonify({"error": "Log file not found"}), 404

    return send_file(log_path, as_attachment=True)
