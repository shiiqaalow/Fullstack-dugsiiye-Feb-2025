import { useContext, useState } from 'react'
import { TodoContext } from './TodoContext'
export const TodoForm = ()=> {
  const [inputValue,setInputValue] = useState('')
  const {dispatch} = useContext(TodoContext)

  const handleChange = (e)=> {
    setInputValue(e.target.value)
  }
  const handleAdd = ()=> {
    if(inputValue.trim()){
      const newTodo = {
        id:Date.now(),
        text:inputValue,
        completed:false
      }
      dispatch({type:'add',payload:newTodo})
      setInputValue('')
    }
  }

  return(
    <div>
      <h2>TodoForm</h2>
      <input 
        type="text" 
        onChange={handleChange}
        value={inputValue}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}