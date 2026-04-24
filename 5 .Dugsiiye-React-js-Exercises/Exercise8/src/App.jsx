import { useState,useEffect } from "react"

const App =()=>{

  const [inputValue,setInputValue]=useState()
  const [time,setTime]=useState(0)
  const [isStarted,setIsStarted]=useState(false)

  useEffect(()=>{
    let timeId
    if(isStarted){
      timeId = setInterval(() => {
          setTime((prev)=>(prev > 0 ? prev-1 : 0))
        }, 1000);
      }

      if(time == 0){
        setIsStarted(false)
      }

    return()=>clearInterval(timeId)
  },[isStarted,time])
  

  const handleInputValue=(e)=>{
    setInputValue(e.target.value)
    setTime(e.target.value)
  }

  const handleStart=()=>{
    setIsStarted(true)
  }
  const handleStop=()=>{
    setIsStarted(false)
  }
  const handleReset=()=>{
    setIsStarted(false)
    setTime(0)
  }

  

  return(
    <>
      <h1>Countdown Timer</h1>
      <div>
        <p>Set Time(seconds):</p>
        <input 
          type="number" 
          min="0"
          onChange={handleInputValue}
          value={inputValue}
        />
        <p>Time Left: {time} seconds </p>
        <button disabled={isStarted} onClick={handleStart}>start</button>
        <button disabled={!isStarted} onClick={handleStop}>stop</button>
        <button onClick={handleReset}>reset</button>

        
      </div>
    </>
  )
}
export default  App


