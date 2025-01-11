import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Edit.module.css';

const BASE_URL = 'https://678247f2c51d092c3dcedd24.mockapi.io';

function Edit() {
  const { id } = useParams();
  const [todo, setTodo] = useState({
    name: '',
    status: ''
  });
  const [successMessage, setSuccessMessage] = useState('');  // สำหรับข้อความแจ้งเตือนสำเร็จ
  const [errorMessage, setErrorMessage] = useState('');  // สำหรับข้อความแจ้งเตือนผิดพลาด

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
      setErrorMessage(''); // เคลียร์ข้อความผิดพลาดเมื่อสำเร็จ
    } catch (error) {
      setErrorMessage('Failed to update Todo. Please try again.');
      setSuccessMessage(''); // เคลียร์ข้อความสำเร็จเมื่อเกิดข้อผิดพลาด
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
        <div>
          <strong>Status: </strong>
          <span className={styles.todoStatus}>{todo.status}</span>
        </div>
      </div>

      <button onClick={updateName}>Update</button>

      {/* แสดงข้อความแจ้งเตือน */}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
}

export default Edit;
