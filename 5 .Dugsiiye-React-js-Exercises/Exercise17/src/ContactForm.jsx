import { useState } from "react";
import { useForm } from "./useForm";

const ContactForm = ()=> {
  const {inputValues,handleInput} = useForm({name:'',email:'',phone:''})
  const handleSubmit = (e)=> {
    e.preventDefault()
    console.log(inputValues)
    alert('Form Submitted Successfully')
  }
  return(
    <form onSubmit = {handleSubmit}>
      <div>
        <label htmlFor="">Name: </label>
        <input 
          type="text" 
          name="name"
          value={inputValues.name}
          onChange={handleInput}
        />
      </div>
      
      <div>
        <label htmlFor="">Email: </label>
        <input 
          type="text" 
          name="email"
          value={inputValues.email}
          onChange={handleInput}
        />
      </div>
      
      <div>
        <label htmlFor="">Phone: </label>
        <input 
          type="text" 
          name="phone"
          value={inputValues.phone}
          onChange={handleInput}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ContactForm