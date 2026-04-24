import { useState } from 'react'
const Counter = ()=> {
const [counter , setCounter] = useState(0)

const incrementButton = ()=> {
        setCounter((prev)=>(prev +1))
}
const decrementButton = ()=> {
        setCounter((prev)=>(prev > 0 ? prev - 1 : 0 ))
}
    return(
     <>
        <h1>Count ({counter})</h1>
        <button  onClick={incrementButton}>Increment</button>
        <button  disabled={counter === 0} onClick={decrementButton}>Decrement</button>
     </>   
    )
}
export default Counter

