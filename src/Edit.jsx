import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Edit.module.css';

const BASE_URL = 'http://localhost:5000';

function Edit() {
  const { id } = useParams();
  const [todo, setTodo] = useState({
    name: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchTodo(todoId) {
    try {
      const response = await axios.get(`${BASE_URL}/todos/${todoId}`);
      setTodo(response.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  function handleNameChange(event) {
    setTodo((previousState) => ({
      ...previousState,
      name: event.target.value
    }));
  }

  async function updateName() {
    try {
      await axios.put(`${BASE_URL}/todos/${id}`, {
        name: todo.name
      });
      setSuccessMessage('Todo updated successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to update Todo. Please try again.');
      setSuccessMessage('');
    }
  }

  useEffect(() => {
    fetchTodo(id);
  }, [id]);

  return (
    <div className={styles.editContainer}>
      <h2>Edit Todo Item</h2>
      <div>
        <div>
          <strong>Current Name: </strong>
          <input
            type="text"
            onChange={handleNameChange}
            value={todo.name}
            placeholder="Enter new name"
          />
        </div>
      </div>

      <button onClick={updateName}>Update</button>

      {/* Display success/error messages */}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
}

export default Edit;
