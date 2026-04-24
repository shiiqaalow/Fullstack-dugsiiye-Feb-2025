import { useState, useEffect } from "react";

const App = () => {
  const [mouseY,setMouseY] = useState(0)
  const [mouseX,setMouseX] = useState(0)

  useEffect(()=>{
    const handleMouseMove=(e)=>{
      setMouseY(e.clientY)
      setMouseX(e.clientX)
  }

    window.addEventListener("mousemove",handleMouseMove)
  },[])

  return (
    <>
      <div>
        <p>Mouse Y: {mouseY}px</p>
        <p>Mouse X: {mouseX}px</p>
    
      </div>
    </>
  );
};

export default App;
