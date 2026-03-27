import React, {useContext} from 'react';
import {AuthContext} from './AuthContext';
import {Navigate} from 'react-router';

const ProtectedPages = ({element}) => {
    const { isLoggedIn } = useContext(AuthContext)
    // console.log(isLoggedIn,element)
    if(!isLoggedIn){
       return <Navigate to='/login' replace/>
    } 
    return element
  
}

export default ProtectedPages;
