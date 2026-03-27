import { Menu, User, X} from 'lucide-react';
import React, {useState} from 'react';
import {Link, NavLink} from 'react-router';
import {useAuth} from '../context/AuthContext';

export const Header = () => {
    const [ isMenuOpen,setIsMenuOpen ] =useState(false)
    const [ isMenuDropdown,setIsMenuDropdown ] =useState(false)
    const { isLoggedIn,profile,logOut } = useAuth()

    const navBars = [
        {title:'Home', link:'/'},
        {title:'Articles', link:'articles'},
        {title:'Write',link:'editor'},
        {title:'My Article',link:'manage-articles'},
        // {title:'Article',link:'editor/:id'},
        // {title:'Dashboard', link:'dashboard'},
    ]
    const avatar_Url = 'https://tse1.mm.bing.net/th/id/OIP.Szga1cua90kz1_Z1pLq2zQHaEJ?pid=Api&P=0&h=180'
    
    return (
        <header className='bg-white shadow'>
            <div className='max-w-7xl mx-auto shadow px-4 sm:px-6 lg:px-8'>
                {/* Header container */}
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <div>
                        <Link to='/' className='text-2xl text-orange-500 font-bold cursor-pointer'>Logo</Link>
                    </div>
                    {/* Desktop Menu */}
                    {isLoggedIn && (
                        <div className='hidden md:flex items-center gap-5'>
                            {navBars.map((nav,index)=>
                                <NavLink to={nav.link} key={index} className={({isActive})=>(isActive ? 'text-orange-500 font-bold text-lg border-b-2 border-orange-600' : 'text-gray-900 text-md ')}>{nav.title}</NavLink>
                            )}
                        </div>
                    )}
                   
                    {/* userProfile  container*/}
                    <div className='flex items-center space-x-3'>
                        {isLoggedIn ? (
                            <div className=' flex items-center space-x-2'>
                                {profile && ( 
                                <div>
                                    <h1 className='text-gray-900 font-md font-bold'>Hello,{profile.username}</h1>
                                </div>)
                                }
                                <div className='relative'>
                                    {/* profile pic */}
                                    <button 
                                    className='flex justify-center items-center  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full cursor-pointer'
                                    onMouseEnter={()=>setIsMenuDropdown(true)}
                                    onClick={()=>setIsMenuDropdown(!isMenuDropdown)}
                                    >
                                        { avatar_Url ? 
                                            <img src={avatar_Url} className='w-9 h-9 rounded-full' /> 
                                            : <div className="bg-gray-200 hover:bg-gray-300 w-9 h-9 rounded-full cursor-pointer flex items-center justify-center">
                                                <User  color='red' />
                                            </div>
                                        }
                                    </button>
                                    {/* dropdown profile */}
                                    {isMenuDropdown  && (
                                        <div className=' absolute right-0 w-48 mt-1 bg-white shadow-lg rounded-md   z-10'
                                         onMouseLeave={()=>setIsMenuDropdown(false)}
                                        >
                                            <div className=''></div>
                                                <Link to='profile' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Your Profile</Link>
                                                <Link className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Manage Profile</Link>
                                                <Link className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                                                onClick={()=>logOut()}
                                                >
                                                    Logout
                                                </Link>
                                            {/* </div> */}
                                        </div>
                                    )}
                                </div>
                                
                                  
                            </div>
                        ):(
                            <div className='space-x-2'>
                                <NavLink to='/signin' className='inline-flex items-center justify-center px-3 py-1 border  text-md font-medium rounded-md  bg-orange-600 text-white border-orange-600 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus-ring-offset-2 focus:ring-orange-500 cursor-pointer'>SignIn</NavLink>
                                <NavLink to='/signup' className=' inline-flex items-center justify-center px-3 py-1 border  text-md font-medium rounded-md  text-orange-600 bg-white border-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus-ring-offset-2 focus:ring-orange-500 cursor-pointer'>SignUP</NavLink>
                            </div>
                        )}
                    </div>
                    {/* Hamburger */}
                    <div className='sm:hidden'>
                        <button 
                        className='cursor-pointer'
                        onClick={()=>setIsMenuOpen(!isMenuOpen)}
                        >
                            {!isMenuOpen ? <Menu size={30}/> : <X size={30}/>}
                        </button>
                    </div>
                    
                   
                </div>

                {/* mobile menu */}

                {isMenuOpen && (
                    <div className='sm:hidden -space-y-3'>
                        <div className='pt-2 pb-3 space-y-2'>
                            <NavLink to='/' className='block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-orange-700 bg-orange-100 rounded-lg'>Home</NavLink>
                            <NavLink to='/Articles'className='block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-orange-700 bg-orange-100 rounded-lg'>Articles</NavLink>
                        </div>
                        {/* if the user is logged in show this */}
                        {isLoggedIn && (
                            <div className='pt-2 pb-3 space-y-2'>
                                <NavLink to='/dashboard' className='block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-orange-700 bg-orange-100 rounded-lg' >Dashboard</NavLink>
                                <NavLink to='/dashboard' className='block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-orange-700 bg-orange-100 rounded-lg' >Dashboard</NavLink>
                                <button 
                                className='block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-orange-700 bg-orange-100 rounded-lg cursor-pointer'
                                onClick={()=>setIsLoggedIn(true)}
                                >
                                    SignOut</button>
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className='pt-2 pb-3 space-y-2'>
                                <NavLink to='/signin' className='block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-orange-700 bg-orange-100 rounded-lg' >SignIn</NavLink>
                                <NavLink to='/signup' className='block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-orange-700 bg-orange-100 rounded-lg' >SignUp</NavLink>
                            </div>
                        )}

                    </div>          
                )}
             
            </div>
        </header>
    );
}

