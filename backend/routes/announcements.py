from flask import Blueprint, request, jsonify, session
from extensions import mysql
from utils import insert_audit_log

announcements_bp = Blueprint('announcements', __name__)

# -------------------------
# Get All Announcements
# -------------------------
@announcements_bp.route('/announcements', methods=['GET'])
def get_announcements():
    if 'user_id' not in session:
        return jsonify({"error": "Login required"}), 401

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT a.id, a.title, a.message, a.created_by, u.name, a.created_at, a.updated_at
        FROM announcements a
        JOIN users u ON a.created_by = u.id
        WHERE a.is_deleted = 0
        ORDER BY a.created_at DESC
    """)

    rows = cursor.fetchall()

    announcements = [{
        "id": r[0],
        "title": r[1],
        "message": r[2],
        "created_by": r[3],
        "created_by_name": r[4],
        "created_at": r[5],
        "updated_at": r[6]
    } for r in rows]

    return jsonify(announcements)


# -------------------------
# Create Announcement (Admin only)
# -------------------------
@announcements_bp.route('/announcements', methods=['POST'])
def create_announcement():
    if 'user_id' not in session: 
        return jsonify({"error": "Login required"}), 401

    if session.get("role") != "Admin":
        return jsonify({"error": "Only admin can create"}), 403

    data = request.json
    title = data.get("title")
    message = data.get("message")

    cursor = mysql.connection.cursor()

    cursor.execute("""
        INSERT INTO announcements (title, message, created_by)
        VALUES (%s, %s, %s)
    """, (title, message, session['user_id']))

    mysql.connection.commit()

    new_id = cursor.lastrowid

    # ✅ Use correct argument names (positional)
    insert_audit_log(
        session['user_id'],
        "CREATE",             # action_type
        "Announcement",       # resource_type
        new_id,
        None,
        {"title": title, "message": message}
    )

    return jsonify({"msg": "Announcement created", "id": new_id})


# -------------------------
# Update Announcement (Admin only)
# -------------------------
@announcements_bp.route('/announcements/<int:id>', methods=['PUT'])
def update_announcement(id):
    if 'user_id' not in session:
        return jsonify({"error": "Login required"}), 401

    if session.get("role") != "Admin":
        return jsonify({"error": "Only admin can update"}), 403

    data = request.json
    title = data.get("title")
    message = data.get("message")

    cursor = mysql.connection.cursor()

    # Get old value for audit
    cursor.execute("SELECT title, message FROM announcements WHERE id=%s", (id,))
    old_row = cursor.fetchone()
    old_value = {"title": old_row[0], "message": old_row[1]} if old_row else None

    cursor.execute("""
        UPDATE announcements 
        SET title=%s, message=%s, updated_at=NOW()
        WHERE id=%s
    """, (title, message, id))

    mysql.connection.commit()

    # Audit Log
    insert_audit_log(
        session['user_id'],
        "UPDATE",
        "Announcement",
        id,
        old_value,
        {"title": title, "message": message}
    )

    return jsonify({"msg": "Announcement updated"})


# -------------------------
# Soft Delete Announcement (Admin only)
# -------------------------
@announcements_bp.route('/announcements/<int:id>', methods=['DELETE'])
def delete_announcement(id):
    if 'user_id' not in session:
        return jsonify({"error": "Login required"}), 401

    if session.get("role") != "Admin":
        return jsonify({"error": "Only admin can delete"}), 403

    cursor = mysql.connection.cursor()

    # Log old value
    cursor.execute("SELECT title, message FROM announcements WHERE id=%s", (id,))
    old_row = cursor.fetchone()
    old_value = {"title": old_row[0], "message": old_row[1]} if old_row else None

    cursor.execute("""
        UPDATE announcements SET is_deleted = 1 WHERE id=%s
    """, (id,))

    mysql.connection.commit()

    # Audit Log
    insert_audit_log(
        session['user_id'],
        "DELETE",
        "Announcement",
        id,
        old_value,
        None
    )

    return jsonify({"msg": "Announcement deleted"})
# -------------------------
# Get single announcement by ID
# -------------------------
@announcements_bp.route('/announcements/<int:id>', methods=['GET'])
def get_announcement(id):
    if 'user_id' not in session:
        return jsonify({"error": "Login required"}), 401

    cursor = mysql.connection.cursor()
    cursor.execute(
        "SELECT id, title, message FROM announcements WHERE id=%s AND is_deleted=0", (id,)
    )
    row = cursor.fetchone()

    if not row:
        return jsonify({"error": "Announcement not found"}), 404

    return jsonify({"id": row[0], "title": row[1], "message": row[2]})

