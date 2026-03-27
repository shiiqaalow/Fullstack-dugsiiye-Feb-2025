import { useReducer } from 'react'
import { TodoContext } from "./TodoContext";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { initialState,reducer } from "./reducer";

export const TodoApp = ()=> {
    const [state,dispatch] = useReducer(reducer,initialState)

    return(
        <div>
            <TodoContext.Provider value={{state,dispatch}}>
                <TodoForm/>
                <TodoList/>
            </TodoContext.Provider>
        </div>
    )
}