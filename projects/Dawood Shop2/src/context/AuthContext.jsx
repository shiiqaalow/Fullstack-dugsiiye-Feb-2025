import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUserProfile, onAuthChange } from '../lib/Auth'

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    const [ user,setUser ] = useState(null)
    const [ profile,setProfile ] = useState(null)
    const [ isLoggedIn,setIsLoggedIn ] = useState(false)
    const [ isLoading,setIsLoading ] = useState(true)

    useEffect(()=>{
        const cleanUP = onAuthChange(async(user)=>{
            setUser(user)

            if(user){
                try {
                    const userProfile = await getUserProfile(user.id)
                    setProfile(userProfile)
                } catch (error) {
                    console.log('Error fetching user profile: ',error)
                }
            }else{
                setProfile(null)
            }
            setIsLoading(false)
        })
        return cleanUP
    },[])

    
    const value = {
        user,
        profile,
        isLoggedIn:!!user,
        isLoading
    }


  return (
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
