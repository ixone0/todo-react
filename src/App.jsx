import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';


const BASE_URL = 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [position, setPosition] = useState({ top: 20, right: 20 });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch todos from API
  async function fetchTodo() {
    try {
      const response = await axios.get(`${BASE_URL}/todos`);
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  // Add a new todo
  async function addName(e) {
    e.preventDefault();
    const todoName = e.target.elements.todoName.value.trim();

    if (!todoName) {
      setErrorMessage('Todo name is required!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/todos`, { name: todoName });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      e.target.reset();
      setSuccessMessage('Todo added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding todo:', error);
      setErrorMessage('Failed to add todo!');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  }

  // Delete a todo
  async function deleteTodo(id) {
    try {
      await axios.delete(`${BASE_URL}/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setSuccessMessage('Todo deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setErrorMessage('Failed to delete todo!');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  }

  async function toggleTodoStatus(id) {
    try {
      const response = await axios.put(`${BASE_URL}/todos/${id}/toggle`);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, is_done: !todo.is_done } : todo
        )
      );
      setSuccessMessage('Todo status updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating todo status:', error);
      setErrorMessage('Failed to update todo status!');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  }

  // Handle drag and repositioning of the add container
  const handleDrag = (e) => {
    const newPosition = {
      top: e.clientY - e.target.offsetHeight / 2,
      right: window.innerWidth - e.clientX - e.target.offsetWidth / 2,
    };
    setPosition(newPosition);
  };

  useEffect(() => {
    fetchTodo();
  }, []);
  
  return (
    <div className="app-con">
      <div className="app-container">
        <h1 className="title">Todo-React</h1>
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div> {/* Loader animation */}
          </div>
        ) : (
          <div>
            {successMessage && <div className="success-message fade-in">{successMessage}</div>}
            {errorMessage && <div className="error-message fade-in">{errorMessage}</div>}
            {todos.length === 0 ? (
              <div>No todos available</div> // Message when no todos
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className={`todo-item ${todo.is_done ? 'done' : ''}`}>
                  <p>{todo.id}. {todo.name}</p>
                  <div className="todo-buttons">
                    <button onClick={() => toggleTodoStatus(todo.id)}>
                      {todo.is_done ? 'Mark as not done' : 'Mark as done'}
                    </button>
                    <Link to={`/todo/${todo.id}`}>
                      <button className="edit-button">Edit</button>
                    </Link>
                    <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div
        className={`add-container ${isCollapsed ? 'collapsed' : ''}`}
        style={{ top: `${position.top}px`, right: `${position.right}px`, position: 'fixed' }}
        draggable
        onDragEnd={handleDrag}
      >
        <button
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '+' : '-'}
        </button>
        {!isCollapsed && (
          <>
            <h3>Add Todo</h3>
            <form onSubmit={addName}>
              <input
                type="text"
                name="todoName"
                placeholder="Enter todo name"
                className="add-input"
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;