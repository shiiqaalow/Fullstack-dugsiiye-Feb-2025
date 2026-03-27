import {useState} from 'react'
const TodoList=()=>{
    const [todos,setTodos] = useState([]);
    const [inputValue,setInputValue] = useState('');

    const handleAdd =()=>{
        const newTodos = {
            id: crypto.randomUUID(),
            text: inputValue,
            completed: false,
        }
        setTodos([...todos,newTodos])
        setInputValue('')
        console.log(todos)
    }
    return(
        <div>
            <h1>Todo List</h1>
            <input 
                type="text"
                placeholder="add-to-do-list"
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
            />
            <button onClick={handleAdd}>add</button>
            <ul>
                {
                  todos.map((todo=>
                    <li>{todo.text}</li>
                  ))
                }
            </ul>
        </div>
    )
}
export default TodoList;