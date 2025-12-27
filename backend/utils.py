import json
from app import mysql

def insert_audit_log(user_id, action_type, resource_type, resource_id=None, old_value=None, new_value=None):
    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO audit_logs (user_id, action_type, resource_type, resource_id, old_value, new_value, created_at) "
        "VALUES (%s,%s,%s,%s,%s,%s,NOW())",
        (
            user_id,
            action_type,
            resource_type,
            resource_id,  # can now be NULL
            json.dumps(old_value) if old_value else None,
            json.dumps(new_value) if new_value else None
        )
    )
    mysql.connection.commit()

