import { useState } from "react"
import UserList from "./UserList"
const App =()=>{
  const [user,setUser] = useState
  ([
      {id:1,name:"shiiqaalow",email:"shiiqaalow99@gmail.com"},
      {id:2,name:"Mc Hamuuda",email:"hamuuda83@gmail.com"},
      {id:3,name:"Hawa Salaad",email:"salaado21@gmail.com"},
      {id:4,name:"Jabra",email:"jaabir108@gmail.com"}
  ])


  

  return(
    <>
            <h1>User List</h1>

      <UserList 
        user={user}
      />
    </>
   )  
}
export default  App