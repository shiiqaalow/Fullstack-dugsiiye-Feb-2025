import { Menu, Moon, Sun, User, UserCircle, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { signOut } from '../lib/Auth'

export const Header = () => {

  const [toggle, setToggle] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)


  const avatar_url = null
  // 'https://supabase.com/docs/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F184441447%3Fv%3D4&w=32&q=75' 


  const navBars = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Dashboard',
      link: 'dashboard'
    },
    {
      title: 'Daily',
      link: 'daily'
    },
    {
      title: 'Weekly',
      link: 'weekly'
    },
    {
      title: 'Monthly',
      link: 'monthly'
    },
    {
      title: 'Yearly',
      link: 'yearly'
    },
  ]

  return (
    <div className='sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b shadow-lg'>

      <div className='h-10 flex justify-between items-center bg-shadow-lg'>
        {/* Logo */}
        <div className='flex items-center gap-2'>

          {/* Mobile menu button */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu />
          </button>

          {/* Mobile menu overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Background overlay */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />

              {/* Slide menu */}
              <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-5 flex flex-col gap-6 animate-slide-in">

                {/* Close button */}
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg text-orange-600">Dawood Shop 2</h2>
                  <button 
                    className='cursor-pointer'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <X/>
                  </button>
                </div>

                {/* Links */}
                {navBars.map((nav, index) => (
                  <NavLink
                    key={index}
                    to={nav.link}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-medium ${isActive
                        ? 'text-orange-600'
                        : 'text-gray-700 hover:text-orange-500'
                      }`
                    }
                  >
                    {nav.title}
                  </NavLink>
                ))}
              </div>
            </div>
          )}


          {/* logo */}

          <div className="">
            <h1 className='text-gray-900'>Dawood <span className='text-orange-600 '> Shop 2 </span> </h1>
          </div>

        </div>


        {/* Desktop menu */}

        <div className="hidden md:flex items-center space-x-3">
          {navBars.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.link}
              className={({ isActive }) => (isActive ? 'text-orange-600 border-b-2 py-2' : 'text-gray-900 font-medium hover:text-orange-500')}
            >
              {nav.title}
            </NavLink>
          ))}

        </div>

        {/* icons */}

        <div className="flex items-center space-x-4">

          {/* Thems */}

          <button
            className=' flex justify-center items-center w-8 h-8 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 cursor-pointer'
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <Sun /> : <Moon />}
          </button>

          {/* Profile */}

          {isLoggedIn ? (
            <div className='flex items-center gap-1'>

              <div className='text-gray-700 text-sm'>
                <span>Hello,</span>
              </div>
              <div className="relative">
                <button className='flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {
                    avatar_url ? <img className='w-8 h-8 rounded-full cursor-pointer' src={avatar_url} /> : <UserCircle className='text-gray-600 cursor-pointer' />
                  }
                </button>

                {/* dropdown menu */}
                {isDropdownOpen && (
                  <div
                    className='absolute right-0 w-48 bg-white mt-1 rounded-md shadow-lg z-50'
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div className='absolute h-3 w-full top-12p '></div>
                    <Link className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Your Profile</Link>
                    <Link className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Manage Articles</Link>

                    <button
                      onClick={() => signOut()}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Signout</button>

                  </div>
                )}
              </div>

            </div>
          )
            :
            (
              /* buttons */
              <div className='flex items-center space-x-4'>
                <Link to="/signin" className="inline-flex items-center justify-center w-20 h-7 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Sign In
                </Link>
                <Link to="/signup" className="hidden sm:inline-flex items-center justify-center w-20 h-7 border text-sm font-medium rounded-md text-orange-600 bg-white border-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Sign Up
                </Link>
              </div>

            )}
        </div>
      </div>



    </div>
  )
}
