import { Moon, Menu, X, User, } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { NavLink,Link } from 'react-router';
import {AuthContext} from '../AuthContext';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext)
    const navbar = [
        { id: 1, label: 'About',link:'/about' },
        // { id: 2, label: 'Contact',link:'/contact' },
        { id: 4, label: 'Dashboard',link:'/dashboard'},
        { id: 5, label: isAuthenticated ? 'LogOut' : 'LogIn',link:'/login' },
        { id: 3, icon: <User />,link:'/user'  },
        // { id: 6, label: 'LogOut',link:'/logout' },
        // { id: 7, label: 'Dashboard',link:'/dashboard' },
    ];

    return (
        <nav className="flex items-center justify-between py-4">
            {/* logo */}
            <div>
                <NavLink to='/' className=" logo text-2xl font-bold">Logo</NavLink>
            </div>
            {/* Desktop Menu */}
            <ul className='hidden md:flex items-center gap-5'>
                {
                    navbar.map((nav)=>(
                        <NavLink
                            className={({isActive})=>(isActive ? 'text-xl text-white font-bold underline' : 'text-gray-700 font-bold text-xl')} 
                            key={nav.id} 
                            to={nav.link}
                            >
                            {nav.label || nav.icon}
                        </NavLink>
                    ))
                }
            </ul>
            {/* Hamburger */}
            <button 
                onClick={()=>setOpen(!open)}
                className='md:hidden cursor-pointer'
            >
                {open ? <Menu size={28} /> : <X size={28} />}
            </button>
            {/* mobile Menu */}
            <ul className={`md:hidden absolute top-16 right-0 w-full bg-white/10 backdrop-blur-lg rounded-lg p-5 shadow-xl transition-all duration-300 flex flex-col items-center gap-2 ${open ? 'opacity-0 scale-90' : 'opacity-100  scale-100 '}`}>
                {
                    navbar.map((nav)=>(
                        <NavLink
                            className={({isActive})=>(isActive ? 'text-xl text-white font-bold underline' : 'text-gray-700 font-bold text-xl')} 
                            key={nav.id} 
                            to={nav.link}
                            >
                            {nav.label || nav.icon}
                        </NavLink>
                    ))
                }
            </ul>


            {/* <ul className="hidden md:flex gap-6 text-lg">
                {navbar.map((nav) => (
                    <li key={nav.id}>
                        <NavLink className={({isActive})=>(isActive ? 'font-bold text-xl text-white ' : 'hover:  font-bold text-gray-950')} to={nav.link}>
                            {nav.label || nav.icon}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <button 
                onClick={() => setOpen(!open)} 
                className="cursor-pointer md:hidden"
            >
                {open ? <X size={28}  /> : <Menu size={28} />}
            </button>

            <div
                className={`md:hidden absolute top-16 left-0 w-full bg-white/10 backdrop-blur-lg rounded-b-xl shadow-lg px-6 py-4 transition-all duration-300 
                ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <ul className="block flex flex-col gap-6 text-lg">
                    {navbar.map((nav) => (
                        <li key={nav.id}>
                            <NavLink className={({isActive})=>(isActive ? 'font-bold text-xl text-white ' : 'hover:  font-bold text-gray-950')} 
                            to={nav.link}
                            onClick={()=>setOpen(false)} 
                            >
                                {nav.label || nav.icon}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div> */}
        </nav>
    );
};

export default Navbar;
