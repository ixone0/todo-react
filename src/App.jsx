import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'https://678247f2c51d092c3dcedd24.mockapi.io'

function App() {

  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchTodo() {
     try {
      const response = await axios.get(`${BASE_URL}/todos`)
      setTodos(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function deleteTodo(id) {
      try {
        setIsLoading(true)
        await axios.delete(`${BASE_URL}/todos/${id}`)
        await fetchTodo()
        setIsLoading(false)
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    fetchTodo()
  }, [])

  return (
    <>
    { isLoading && (<div>Loading...</div>) }
    { !isLoading && <div>
      {
        todos.map((todo, index) => (
          <div key={index}>
            {todo.id} {todo.name} {todo.status} 
            <button>Edit</button>
            <button 
              onClick={async () => {
                await deleteTodo(todo.id)
              }}
            >Delete</button>
          </div>
        ))
      }
    </div>
    }
    </>
  )
}

export default App
