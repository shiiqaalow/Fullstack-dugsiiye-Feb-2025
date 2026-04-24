import { useContext,useEffect,useState } from "react"
import { TodoContext } from "./useContext"
import { TodoList } from "./TodoList"
import styles from "./TodoForm.module.css"

export const TodoForm = ()=> {
    const { state, dispatch } = useContext(TodoContext)
    const [ todoInput,setTodoInput ] = useState('')

   

    const handleChange = (e)=> {
        setTodoInput(e.target.value)
    }
    const handleAddTodo = (e)=> {
        e.preventDefault()
        if(todoInput.trim()) {
            const newTodo = {
                id:Date.now(),
                text:todoInput,
                completed:false,
            }
        dispatch({type:'add',payload:newTodo})
        setTodoInput('')
        }
    }
    return(
        <div className={styles.form}>
            <form onSubmit={handleAddTodo}>
                <h2 className={styles.todoTitle}>ToDoApp</h2>
                <div className={styles.todoContainer}>
                    <input className={styles.input}
                        type="text"
                        placeholder="Add-New-Todo"
                        value={todoInput}
                        onChange={handleChange}
                    />
                    <button type="submit" className={styles.button}>Add</button>
                </div>
               
            </form>
            {
                state.length > 0 &&     
                state.map((todo)=>(
                    <TodoList key={todo.id} todo={todo}/>
                ))
            }
                    
                
            
        </div>
    )
}