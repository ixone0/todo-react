import Image from './components/Image.jsx'
import Checkbox from './components/Checkbox.jsx'

function App() {

  const todoList = [
    {
      text: 'coding react',
      isChecked: false
    },
    {
      text: 'doing document react',
      isChecked: true
    },
    {
      text: 'test react',
      isChecked: false
    }
  ]
  return (
    <div>
      {
        todoList.map((todo, index) => (
            <Checkbox 
              key={index}
              text={todo.text}
              isChecked={todo.isChecked}
            />

        ))
      }
    </div>
  )
}

export default App
