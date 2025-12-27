# # from flask import Blueprint, jsonify, session
# # from extensions import mysql

# # import json

# # audit_bp = Blueprint('audit', __name__)

# # @audit_bp.route('/audit-logs/<resource_type>', methods=['GET'])
# # def get_audit_logs(resource_type):
# #     if 'user_id' not in session: return jsonify({'error':'Login required'}),401
# #     cursor = mysql.connection.cursor()
# #     if session.get('role') == 'Admin':
# #         cursor.execute("SELECT id,user_id,action_type,resource_type,resource_id,old_value,new_value,created_at FROM audit_logs WHERE resource_type=%s",(resource_type,))
# #     else:
# #         cursor.execute("SELECT id,user_id,action_type,resource_type,resource_id,old_value,new_value,created_at FROM audit_logs WHERE resource_type=%s AND user_id=%s",(resource_type,session['user_id']))
# #     logs = cursor.fetchall()
# #     return jsonify([{
# #         'id': l[0], 'user_id': l[1], 'action_type': l[2],
# #         'resource_type': l[3], 'resource_id': l[4],
# #         'old_value': json.loads(l[5]) if l[5] else None,
# #         'new_value': json.loads(l[6]) if l[6] else None,
# #         'created_at': l[7]
# #     } for l in logs])

# from flask import Blueprint, jsonify, session
# from extensions import mysql
# import json

# audit_bp = Blueprint('audit', __name__)

# @audit_bp.route('/audit-logs', methods=['GET'])
# def get_audit_logs():
#     if 'user_id' not in session:
#         return jsonify({'error': 'Login required'}), 401

#     resource_type = session.get('resource_type')  # optional filter if needed
#     cursor = mysql.connection.cursor()

#     if session.get('role') == 'Admin':
#         # Admin sees all logs
#         if resource_type:
#             cursor.execute("""
#                 SELECT id,user_id,action_type,resource_type,resource_id,old_value,new_value,created_at 
#                 FROM audit_logs WHERE resource_type=%s
#             """, (resource_type,))
#         else:
#             cursor.execute("""
#                 SELECT id,user_id,action_type,resource_type,resource_id,old_value,new_value,created_at 
#                 FROM audit_logs
#             """)
#     else:
#         # Regular user sees only their own logs
#         if resource_type:
#             cursor.execute("""
#                 SELECT id,user_id,action_type,resource_type,resource_id,old_value,new_value,created_at 
#                 FROM audit_logs WHERE user_id=%s AND resource_type=%s
#             """, (session['user_id'], resource_type))
#         else:
#             cursor.execute("""
#                 SELECT id,user_id,action_type,resource_type,resource_id,old_value,new_value,created_at 
#                 FROM audit_logs WHERE user_id=%s
#             """, (session['user_id'],))

#     logs = cursor.fetchall()
#     return jsonify([{
#         'id': l[0],
#         'user_id': l[1],
#         'action_type': l[2],
#         'resource_type': l[3],
#         'resource_id': l[4],
#         'old_value': json.loads(l[5]) if l[5] else None,
#         'new_value': json.loads(l[6]) if l[6] else None,
#         'created_at': l[7]
#     } for l in logs])


from flask import Blueprint, jsonify, session
from extensions import mysql
import json

audit_bp = Blueprint('audit', __name__)

@audit_bp.route('/audit-logs', methods=['GET'])
def get_audit_logs():
    if 'user_id' not in session:
        return jsonify({'error': 'Login required'}), 401

    cursor = mysql.connection.cursor()

    if session.get('role') == 'Admin':
        # Admin sees all logs, join with users to get name
        cursor.execute("""
            SELECT a.id, a.user_id, u.name, a.action_type, a.resource_type, a.resource_id, 
                   a.old_value, a.new_value, a.created_at
            FROM audit_logs a
            LEFT JOIN users u ON a.user_id = u.id
            ORDER BY a.created_at DESC
        """)
    else:
        # Regular user sees only their own logs
        cursor.execute("""
            SELECT a.id, a.user_id, u.name, a.action_type, a.resource_type, a.resource_id, 
                   a.old_value, a.new_value, a.created_at
            FROM audit_logs a
            LEFT JOIN users u ON a.user_id = u.id
            WHERE a.user_id=%s
            ORDER BY a.created_at DESC
        """, (session['user_id'],))

    logs = cursor.fetchall()
    return jsonify([{
        'id': l[0],
        'user_id': l[1],
        'user_name': l[2],  # <-- new field
        'action_type': l[3],
        'resource_type': l[4],
        'resource_id': l[5],
        'old_value': json.loads(l[6]) if l[6] else None,
        'new_value': json.loads(l[7]) if l[7] else None,
        'created_at': l[8]
    } for l in logs])
