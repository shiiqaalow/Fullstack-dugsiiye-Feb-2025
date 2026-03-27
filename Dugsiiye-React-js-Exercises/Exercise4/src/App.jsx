import { useState } from 'react';
  const App = () => {
    const [changed,setIsChanged]=useState(false)
     const toggle = ()=>{
      setIsChanged(!changed)
     }
    return(
      <>
        <p>Your button is {changed ?'On' : 'Off'}</p>
        <button onClick={toggle}>Turn {changed ? 'Off' : 'On'}</button>
      </>
      
    )
}
export default App
