# Todo-List Application

This is a simple **Todo-List Web Application** built with **React** and **Node.js**. The application allows users to manage their tasks with features such as adding, editing, deleting, and marking tasks as done. The backend is powered by **Express** and **MySQL**, and the frontend uses **React** for an interactive user interface.

---

## Features

1. **Add Tasks**: Create new todos with a task name.
2. **Edit Tasks**: Update the name of an existing todo.
3. **Delete Tasks**: Remove todos permanently from the list.
4. **Mark as Done**: Toggle the status of a todo between completed and not completed.

---

## Technology Stack

### Frontend:

- **React**: For building the user interface and managing state.

### Backend:

- **Node.js**: For running the backend server.
- **Express**: As the web framework for creating API endpoints.

### Database:

- **MySQL**: For storing todo tasks.
- **XAMPP**: To manage and run the MySQL database locally.

### Tools:

- **Postman**: To test API endpoints during development.

---

## Prerequisites

1. **Node.js**: Ensure Node.js is installed on your system. [Download Node.js](https://nodejs.org/)
2. **XAMPP**: Install XAMPP to set up MySQL and Apache locally. [Download XAMPP](https://www.apachefriends.org/index.html)
3. **MySQL Database**: Set up a MySQL database for storing todos.

---

## Installation

### Backend Setup:

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Set up the database:
   - Start XAMPP and ensure MySQL is running.
   - Open phpMyAdmin and create a database (e.g., `todo_db`).
   - Import the provided SQL script (if available) or create a `todos` table manually:
     ```sql
     CREATE TABLE todos (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         is_done BOOLEAN DEFAULT FALSE
     );
     ```
4. Update the database configuration in `server.js`:
   ```javascript
   const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: '', // Your MySQL password
       database: 'todo_db'
   });
   ```
5. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup:

1. Navigate to the frontend folder:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:3000`.

---

## API Endpoints

### Base URL:

`http://localhost:5000`

### Endpoints:

1. **Get All Todos**: `GET /todos`
2. **Add a Todo**: `POST /todos`
   - Body:
     ```json
     {
       "name": "Sample Task"
     }
     ```
3. **Update a Todo**: `PUT /todos/:id`
   - Body (for editing):
     ```json
     {
       "name": "Updated Task Name"
     }
     ```
   - No body required for toggling status.
4. **Delete a Todo**: `DELETE /todos/:id`

---

## Usage

1. Open the frontend in your browser at `http://localhost:3000`.
2. Add new tasks using the form.
3. Mark tasks as done or not done by clicking the status button.
4. Edit or delete tasks using the corresponding buttons.

---

## Testing with Postman

1. Start the backend server (`http://localhost:5000`).
2. Use Postman to send requests to the API endpoints listed above.
3. Verify the database updates by checking phpMyAdmin.

---

## Future Enhancements

- Add user authentication.
- Implement category-based task organization.
- Enhance the UI/UX with animations and themes.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

