import { useState, useEffect } from "react";

const App = () => {
  const [Name, setName] = useState(""); 
  const [Greeting, setGreeting] = useState("hello"); 

  useEffect(() => {
    if (!Name || Greeting === "hello") {
      document.title = `${'welcome'} ${Name}`;
    } else {
      document.title = `${Greeting} ${Name}`;
    }
  }, [Name, Greeting]);

  return (
    <>
      <div>
        <h1>Enter Your Name:</h1>
        <input 
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <h1>Choose Greeting:</h1>
        <input 
          type="text"
          value={Greeting}
          onChange={(e) => setGreeting(e.target.value)}
        />
      </div>
    </>
  );
};

export default App;
