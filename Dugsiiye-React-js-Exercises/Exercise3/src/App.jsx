
import UserCard from './UserCard-1';
  const App = () => {
        const name = 'Abdimalik,Abdulahi'
        const Email = 'Shiiqaalow99@gmail.com'
        const role = 'Software Developer'
    return(
      <>
        <UserCard
          name = {name}
          Email = {Email}
          role = {role}
        />
      </>
    )
    
  }

export default App
