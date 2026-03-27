import { createContext, use, useContext, useEffect, useState } from "react";
import {getUserProfile, onAuthChange, signOut} from "../lib/auth";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {

    const [ user,setUser ] = useState(null)
    const [ profile,setProfile ] = useState(null)
    const [ isLoading,setIsLoading ] = useState(false)
    const [ isLoggedIn,setIsLoggedIn ] = useState(false)

    useEffect(()=>{
        const cleanUp = onAuthChange(async (user) => {

            setIsLoading(true)

            setUser(user)

            if(user){

                try {
                   const userProfile = await getUserProfile(user.id)
                   setProfile(userProfile)  
                } catch (error) {
                    console.error('error fetching user profile',error)
                }
            }else{
                setProfile(null)
            }
            setIsLoading(false)
        })
        return cleanUp
    },[])


    const logOut = async () => {
        try{
            await signOut()
        }catch(error){
            console.log('error logging out',error)
        }
    }

    const value = {
        user,
        profile,
        isLoading,
        isLoggedIn : !!user,
        logOut
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(context === null) {
        throw new Error('useAuth must be used within and AuthProvider')
    }
    return context
}