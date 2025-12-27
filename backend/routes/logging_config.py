import logging
from logging.handlers import RotatingFileHandler
import os

# Create logs folder if not exists
if not os.path.exists("logs"):
    os.mkdir("logs")

# Configure logger
file_handler = RotatingFileHandler("logs/server.log", maxBytes=1024*1024*5, backupCount=5)
file_handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)

# Add to Flask app logger
# app.logger.addHandler(file_handler) will be done after creating app
