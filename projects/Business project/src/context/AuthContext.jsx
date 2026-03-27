import { Children, createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange } from "../lib/Auth";

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {

    const [ user,setUser ] = useState(null)
    const [ profile,setProfile ] = useState(null)
    const [ isLoggedIn,setIsLoggedIn ] = useState(true)
    const [ isLoading,setIsLoading ] = useState(true)

    useEffect(()=>{
        const cleanUp = onAuthChange(async(user)=>{
            setUser(user)

            if(user){
                try {
                    const userProfile = await getUserProfile(user.id)
                    setProfile(userProfile) 
                } catch (error) {
                    console.error('Error fetching user profile',error)
                }
            }else {
                setProfile(null)
            }
            setIsLoading(false)
        })
        return cleanUp
    },[])

    const value = {
        user,
        profile,
        isLoading,
        isLoggedIn
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext)
    if(context === null){
        throw new Error('useAuth must be used within and AuthProvider')
    }
}