import {useContext} from 'react'
import {TodoContext} from './useContext'

export const TodoList = ({todo})=> {
    const {dispatch} = useContext(TodoContext)
    const style = {
        textDecoration : todo.completed ? 'line-through' : 'none',
        color: todo.completed ? 'gray' : 'black',
        cursor: 'pointer'
    }
    return(
        <li className="flex justify-between items-center font-semibold bg-gray-100 hover:bg-gray-200 p-2 rounded-lg">
            <input type="checkbox"onClick={()=>dispatch({type:'toggleCompleted',payload:todo.id})} className="cursor-pointer"  />
            <span style={style}>{todo.text}</span>
            <p className="text-red-700 font-semibold cursor-pointer" onClick={()=>dispatch({type:'delete',payload:todo.id})}>Delete</p>
        </li>
    )
}