import { useContext } from "react"
import { TodoContext } from "./TodoContext"
import { TodoItem } from "./TodoItem"

export const TodoList = ()=> {
  const {state} = useContext(TodoContext)
 
  return(
    <ul>
      {state.map((todo)=>(
        <TodoItem  key={todo.id} todo={todo}/>
      ))}
    </ul>
  )
}