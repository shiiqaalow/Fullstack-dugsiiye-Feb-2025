import { useState } from "react"
import LogInForm from "./LogInForm"
const App =()=>{
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [inputValue,setInputValue] = useState('')

   const handleForm = ()=>{
      setInputValue("")
      setIsLoggedIn(!isLoggedIn)
    }
 
  return(
    <>
      {
        isLoggedIn ? 
        <div>
          <h1>Welcome Back !  Mr: ({inputValue})</h1>
          <button type="submit" onClick={handleForm}>{isLoggedIn ? 'sign Out' : 'sign In'}</button>
        </div>
         
        : <LogInForm 
          isLoggedIn = {isLoggedIn} 
          setIsLoggedIn = {setIsLoggedIn} 
          inputValue = {inputValue} 
          setInputValue = {setInputValue} 
          />
      }
    </>
   )  
}
export default  App