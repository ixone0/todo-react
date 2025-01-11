import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const BASE_URL = 'https://678247f2c51d092c3dcedd24.mockapi.io';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  async function fetchTodo() {
    try {
      const response = await axios.get(`${BASE_URL}/todos`);
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  async function deleteTodo(id) {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/todos/${id}`);
      await fetchTodo();
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  useEffect(() => {
    console.log('Location changed to:', location.pathname);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-con">
      <div className="app-container">
        <h1 className="title">Todo-React</h1>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div>
            {todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <p>{todo.id}. {todo.name}</p>
                <div className="todo-buttons">
                  <Link to={`/todo/${todo.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={async () => {
                      await deleteTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
