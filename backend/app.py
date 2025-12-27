from flask import Flask
from flask_cors import CORS
from config import MYSQL_CONFIG, SECRET_KEY
from extensions import mysql
from datetime import timedelta
from routes.logging_config import file_handler
import logging


# def create_app():
#     app = Flask(__name__)

#     # Secret key for sessions
#     app.secret_key = SECRET_KEY

#     # MySQL configuration
#     app.config.update(MYSQL_CONFIG)

#     # Session cookie settings
#     # "Lax" works for localhost; "None" requires HTTPS
#     app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
#     app.config["SESSION_COOKIE_SECURE"] = False  # True if using HTTPS
#     app.permanent_session_lifetime = timedelta(hours=1) 
#     # Allow React frontend to call backend with credentials
#     CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

#     # Initialize MySQL
#     mysql.init_app(app)
#     app.logger.addHandler(file_handler)
#     app.logger.setLevel(logging.INFO)
#     app.logger.info("Flask app initialized")

#     # Import and register Blueprints
#     from routes.auth import auth_bp
#     from routes.admin import admin_bp
#     from routes.complaints import complaints_bp
#     from routes.announcements import announcements_bp
#     from routes.audit_logs import audit_bp

#     app.register_blueprint(auth_bp)
#     app.register_blueprint(admin_bp)
#     app.register_blueprint(complaints_bp)
#     app.register_blueprint(audit_bp)
#     app.register_blueprint(announcements_bp)
    

#     return app

# if __name__ == "__main__":
#     app = create_app()
#     # Run backend on localhost:5000
#     app.run(debug=True)

def create_app():
    app = Flask(__name__)

    # Secret key for sessions
    app.secret_key = SECRET_KEY

    # MySQL configuration
    app.config.update(MYSQL_CONFIG)

    # Session cookie settings
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_SECURE"] = False
    app.permanent_session_lifetime = timedelta(hours=1)

    # Allow React frontend to call backend with credentials
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    # Initialize MySQL
    mysql.init_app(app)
    
    # Logging
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info("Flask app initialized")

    # Import and register Blueprints
    from routes.auth import auth_bp
    from routes.admin import admin_bp
    from routes.complaints import complaints_bp
    from routes.announcements import announcements_bp
    from routes.audit_logs import audit_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(complaints_bp)
    app.register_blueprint(audit_bp)
    app.register_blueprint(announcements_bp)

    # ================================
    # ERROR HANDLERS
    # ================================
    
    @app.errorhandler(404)
    def not_found(error):
        app.logger.warning(f"404 Error: {error}")
        return jsonify({'error': 'Page Not Found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.error(f"500 Error: {error}")
        return jsonify({'error': 'Internal Server Error'}), 500

    @app.errorhandler(401)
    def unauthorized_error(error):
        app.logger.warning(f"401 Error: {error}")
        return jsonify({'error': 'Unauthorized'}), 401

    return app
if __name__ == "__main__":
    app = create_app()
    # Run backend on localhost:5000
    app.run(debug=True)