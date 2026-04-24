import {Link, useNavigate, useParams} from "react-router"

import React, {useContext} from 'react';
import {AuthContext} from "../AuthContext";

const Logout = () => {
    const { logout } = useContext(AuthContext)
    const Navigate = useNavigate()
    const handleLogout = () => {
        confirm('Are you sure to logout!')
        logout()
        Navigate('/')
    }
    return (
        <div>
            <div className="h-screen flex flex-col justify-center items-center">
                <div>
                    <h1 className="text-4xl text-gray-900 font-bold">Logout</h1>
                </div>
                <div>
                    <button onClick={handleLogout} className="text-3xl bg-green-300 px-5 rounded-lg cursor-pointer ">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Logout;
