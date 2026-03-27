import { useState } from "react";

export const useForm = (initialValue)=> {
  const [inputValues,setInputValues] = useState(initialValue)

  const handleInput =(e)=> {
    const {name,value} = e.target
    setInputValues((prev)=>({...prev,[name]:value}))
  }
  return({inputValues,handleInput})
}

