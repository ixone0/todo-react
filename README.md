# To-Do List Application

A simple To-Do list application built with React and Node.js that allows users to add, edit, and delete tasks.

## Features
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed

## Technologies Used
- React
- Node.js
- Express
- MySQL
- XAMPP (for local database management)
- Postman (for API testing)

## Installation

### Prerequisites
- [XAMPP](https://www.apachefriends.org/index.html) installed on your machine.
- Node.js and npm installed.

### Steps to Set Up

1. **Install and Start XAMPP**:
   - Download and install XAMPP.
   - Start the Apache and MySQL modules from the XAMPP Control Panel.

2. **Clone the repository**:
   ```bash
   git clone https://github.com/username/todo-app.git

3. Set up the database:
    Open phpMyAdmin at http://localhost/phpmyadmin.
    Create a new database named todo_db.
    Import the SQL file located in the database folder (if available) to create the necessary tables.

4. Navigate to the backend directory:
    cd todo-app/backend

5. Install backend dependencies:
    npm install

6. Start the backend server:
    node server.js

7. Navigate to the frontend directory:
    cd ../frontend

8. Install frontend dependencies:
    npm install

9. Start the frontend application:
    npm start
    Visit http://localhost:3000 to view the application.

Testing with Postman
Use Postman to test the API endpoints.
Example endpoints:
Get all tasks: GET http://localhost:5000/todos
Add a new task:
Method: POST
URL: http://localhost:5000/todos
Body (JSON):
json

Copy
{
  "name": "Task Name"
}
Edit a task:
Method: PUT
URL: http://localhost:5000/todos/:id
Body (JSON):
json

Copy
{
  "name": "Updated Task Name"
}
Delete a task: DELETE http://localhost:5000/todos/:id
Contributing
Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute.

License
This project is licensed under the MIT License - see the LICENSE file for details.