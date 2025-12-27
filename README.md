# Cry2Admin

Cry2Admin is a web application for managing residential complaints and announcements. The project consists of a **Flask** backend, a **React** frontend, and uses **MySQL** as the database. It is designed to streamline communication between residents, security staff, and administrators.  

## Features

### Complaint Management
- Residents and security staff can create complaints.
- Admin can process and resolve complaints.
- Users can track the status of their complaints.

### Announcements
- Admin can create and manage announcements.
- Residents and staff can view all announcements.

## Technology Stack
- **Backend:** Flask  
- **Frontend:** React  
- **Database:** MySQL (run via WAMP)  

## Project Structure
```

Cry2Admin/
├── backend/       # Flask backend
├── frontend/      # React frontend
└── README.md

````

## Setup and Installation

### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
````

2. Create a virtual environment:

   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:

   * **Windows:**

     ```bash
     venv\Scripts\activate
     ```
   * **Linux/Mac:**

     ```bash
     source venv/bin/activate
     ```
4. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
5. Configure MySQL in the `config.py` file:

   ```python
   MYSQL_HOST = 'localhost'
   MYSQL_USER = 'your_username'
   MYSQL_PASSWORD = 'your_password'
   MYSQL_DB = 'your_database_name'
   ```
6. Run the backend server:

   ```bash
   python app.py
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React frontend:

   ```bash
   npm start
   ```

## Usage

* Residents and security staff can create complaints and view announcements.
* Admin can manage complaints and create announcements.
* All users can see the status of complaints and announcements in real-time.

## Notes

* Ensure that MySQL is running (e.g., via WAMP).
* Make sure the database configuration in `config.py` matches your MySQL credentials.


