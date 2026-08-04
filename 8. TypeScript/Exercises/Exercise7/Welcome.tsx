// 1 
interface WelcomeProps {
    userName: string,
    isPremium: boolean,
}
export const Welcome = ({userName,isPremium}: WelcomeProps) => {
  return (
    <div>
        Welcome
        <h2>
            {userName.toUpperCase()}
        </h2>
        <h3>
            Welcome {isPremium ? 'Back Premium User' : 'Guest!' }
        </h3>
    </div>
  )
}
