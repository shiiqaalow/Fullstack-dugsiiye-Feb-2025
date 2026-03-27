import { useState } from "react"

const TodoList=()=>{
    const [todos,setTodos] = useState([])
    const [productName,setProductName] = useState('')
    const [productPrice,setProductPrice] = useState('')

    const handleTask=()=>{
        if(!productName || !productPrice ) return;
        const newTodos = {
            id: crypto.randomUUID(),
            text: productName,
            price: productPrice,
            quantity:1,
            completed: false,
        }
        setTodos([...todos,newTodos])
        setProductName('')
        setProductPrice('')
         console.log(todos)
    }

    const increment=(id)=>{
      setTodos(
        todos.map((todo)=>
            todo.id === id ? {...todo, quantity: todo.quantity+1} : todo
        )
       )
    }
    const decrement=(id)=>{
         setTodos(
        todos.map((todo)=> 
            todo.id === id && todo.quantity > 1 ? {...todo, quantity: todo.quantity-1} : todo
        )
       )
    }

    const handleRemove=(id)=>{
        setTodos(todos.filter((todo)=>todo.id !== id))
    }

    const handleTotal=()=>{
        return todos.reduce((acc, todo) => acc + todo.price * todo.quantity, 0)
    }

    return(
        <div className="container">
            <h1>add to cart</h1>
            <form className="add-task">
                <input 
                    type="text"
                    placeholder="product name"
                    value={productName}
                    required
                    onChange={(e)=>setProductName(e.target.value)}
                />
                <input 
                    type="number"
                    placeholder="product price"
                    value={productPrice}
                    required
                    onChange={(e)=>setProductPrice(e.target.value)}
                />
                <button className="add-btn" onClick={handleTask}>add</button>
                {todos.map((todo=>
                    <div className="product">
                        <p className="product-name">{todo.text}</p>
                        <p className="product-price">${todo.price}</p>
                        <div className="product-buttons">
                                <button className="decrement" onClick={() => decrement(todo.id)}>-</button>
                                <button className="quantity">{todo.quantity}</button>
                                <button className="increment" onClick={() => increment(todo.id)}>+</button>
                        </div>
                        <button className="remove-product" onClick={()=>handleRemove(todo.id)}>Remove</button>
                    </div>
                ))}
           
            </form>
            <h2 className="total-price">
                {todos.length === 0 ? "Your Cart is Empty." : `Total: $${handleTotal()}`}
            </h2>
        </div>
    )
}
export default TodoList