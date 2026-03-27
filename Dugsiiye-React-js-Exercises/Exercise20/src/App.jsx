import { useReducer,useEffect } from 'react'
import { TodoContext } from './useContext'
import { reducer,initialState } from './reducer'
import { TodoForm } from './TodoForm'
const App = ()=> {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]") 
    const [ state,dispatch ] = useReducer(reducer,savedTodos.length ? savedTodos : initialState )
   useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);
    return(
        <TodoContext.Provider value={{state,dispatch}}>
            <TodoForm/>
        </TodoContext.Provider>
    )
}
export default App