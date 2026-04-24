import { useState,useEffect } from "react"
const App =()=>{

  const [inputValue,setInputValue] = useState('')
  const [searchInput,setSearchInput] = useState('') //this state fires only when the btn is clicked to avoid using input value inside useEffect which cause to fire on (keystroke)
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(false)

    useEffect(()=>{

      if(!searchInput) return
      const fetchData = async() => {

        setLoading(true)
        setUser(null)
        await new Promise((resolve)=>setTimeout(resolve,4900))
        try{
          const response = await fetch(`https://api.github.com/users/${inputValue}`)
          const userData = await response.json()
          setUser(userData)
          setLoading(false)
          console.log("user-Data",userData)
        }
        catch(err){
          console.log("failed to fetch data",userData)
        }
      }

      fetchData()

    },[searchInput])
      
  
  const displayUserData = () => {
    if(inputValue.trim()){
      setSearchInput(inputValue)
    }
  }

  const userInfo = (
    <div>
      <h1>Github User Search</h1>
      <input 
        type="text"
        onChange={(e)=>setInputValue(e.target.value)}
        value={inputValue} 
      />
      <button onClick={displayUserData}>Search</button>
    </div>
  )


  if(loading){
    return(
      <>
        {userInfo}
        <div className="progress-container">
          <div className="progress">
            <div className="progress-bar">Loading.....</div>
          </div>
        </div>
      </>
    )
  }

  return(
    <>
    {userInfo}
     {user && !user.message && (
        <div>
          <p>{user.name}</p>
          <img src={user.avatar_url} alt={user.login} width="100" />
          <p>Location: {user.location || "N/A"}</p>
          <p>Public Repos: {user.public_repos}</p>
        </div>
      )}

      {user && user.message && (
        <p style={{ color: "red" }}> Mi G this User can not found 😌 </p>
      )}
    </>
  )
  

   
  
}
export default  App