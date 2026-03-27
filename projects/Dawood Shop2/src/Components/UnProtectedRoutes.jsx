import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'

export const UnProtectedRoutes = ({children,redirect='/'}) => {
    const { isLoggedIn,isLoading } = useAuth()
    if(isLoading) {
        return(
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full w-12 h-12 border-t-2 border-b-2 border-orange-500">
                </div>
            </div>
        )
    }

    if(isLoggedIn) {
        return <Navigate to={redirect} />
    }

    return children
  
}
