import {Link, useNavigate, useParams} from "react-router"

import React, {useContext} from 'react';
import {AuthContext} from "../AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext)
    const Navigate = useNavigate()
    const handleLogin = () => {
        login()
        Navigate('/')
    }
    return (
        <div>
            <div className="h-screen flex flex-col justify-center items-center space-y-3 uppercase">
                <div className="text-center space-y-3 ">
                    <h1 className="text-4xl text-gray-900 font-bold">Login</h1>
                    <p className="text-xl text-gray-900 font-bold ">You must sign in to have access to create a post!</p>
                </div>
                <div>
                    <button onClick={handleLogin} className="text-3xl bg-green-300 px-5 rounded-lg cursor-pointer uppercase font-semibold hover:bg-green-200">Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
