import {useContext} from 'react'
import {TodoContext} from './useContext'
import styles from "./TodoList.module.css"

export const TodoList = ({todo})=> {
    const {dispatch} = useContext(TodoContext)
    const style = {
        textDecoration : todo.completed ? 'line-through' : 'none',
        color: todo.completed ? 'gray' : 'black',
        cursor: 'pointer'
    }
    return(
        <li className={styles.li}>
            <input type="checkbox"  onClick={()=>dispatch({type:'toggleCompleted',payload:todo.id})}  />
            <span style={style}>{todo.text}</span>
            <p className={styles.deleteBtn} onClick={()=>dispatch({type:'delete',payload:todo.id})}>Delete</p>
        </li>
    )
}