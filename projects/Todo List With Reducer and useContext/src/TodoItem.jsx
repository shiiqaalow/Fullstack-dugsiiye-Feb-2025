import { useContext } from "react"
import { TodoContext } from "./TodoContext"

export const TodoItem = ({todo})=> {
    const { dispatch } = useContext(TodoContext)

    const style = {
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? 'gray' : 'white',
        cursor:'pointer'
    }
  
    return(
        <li>
            <span onClick={()=>dispatch({type:'toggle',payload:todo.id})} style={style}>{todo.text} </span>
            <button onClick={()=>dispatch({type:'delete',payload:todo.id})}>remove</button>
        </li>
    )
}