const LogInForm = ({isLoggedIn,setIsLoggedIn,inputValue,setInputValue})=> {


    const handleForm = (e)=>{
        e.preventDefault()
        setIsLoggedIn(!isLoggedIn)
    }
    return(
        <form onSubmit={handleForm}>
            <h1>LogIn</h1>
            <label htmlFor="Username">Username </label>
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} required/>
            <label htmlFor="password">password </label>
            <input type="password" required/>
            <button type="submit">{isLoggedIn ? 'sign Out' : 'sign In'}</button>
        </form>

    )
}
export default LogInForm

