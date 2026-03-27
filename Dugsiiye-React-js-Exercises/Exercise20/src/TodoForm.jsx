import { useContext,useEffect,useState } from "react"
import { TodoContext } from "./useContext"
import { TodoList } from "./TodoList"

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
        <div className="p-1 mx-auto my-30 w-xl rounded-xl ">
            <form onSubmit={handleAddTodo} className=" w-100 flex flex-col gap-5 bg-white p-10 rounded-lg" >
                <h2 className="text-2xl font-semibold text-center">ToDoApp</h2>
                <div className="flex gap-5">
                    <input className="border-1 border-black rounded px-2 w-full"
                        type="text"
                        placeholder="Add-New-Todo"
                        value={todoInput}
                        onChange={handleChange}
                    />
                    <button type="submit" className="bg-purple-500 py-2 px-7 text-white font-semibold rounded hover: bg-blue-400 cursor-pointer">Add</button>
                </div>
                {
                    state.length > 0 &&     
                    state.map((todo)=>(
                        <TodoList key={todo.id} todo={todo}/>
                    ))
            }
               
            </form>
         
                    
                
            
        </div>
    )
}