
import {useContext} from 'react'
import './App.css'
import { Outlet,NavLink } from 'react-router'
import {AuthContext} from './AuthContext'

const App = ()=> {
  const { isLoggedIn } = useContext(AuthContext)


    return(
      <div className='min-h-screen  bg-gradient-to-br from-gray-400 via-rose-300 to-gray-400 '>
        <div className='max-w-4xl mx-auto p-6'>
            <div>
              <h1 className='font-bold text-2xl text-gray-900 py-5'>React Blog</h1>
            </div>
            <div className=' space-x-2'>
              <NavLink className={({isActive})=>(isActive ? 'font-bold text-white bg-blue-600 px-4 py-1 rounded-lg ' : 'hover:bg-blue-300 font-bold px-4 py-1 rounded-lg')} to='/'>Home</NavLink>
              {
                isLoggedIn && (
                  <NavLink className={({isActive})=>(isActive ? 'font-bold text-white bg-blue-600 px-4 py-1 rounded-lg ' : 'hover:bg-blue-300 font-bold px-4 py-1 rounded-lg')} to='/create' >Create Post</NavLink>
                )
              }
              {
                !isLoggedIn && (
                  <NavLink className={({isActive})=>(isActive ? 'font-bold text-white bg-blue-600 px-4 py-1 rounded-lg ' : 'hover:bg-blue-300 font-bold px-4 py-1 rounded-lg')} to='/login' >Login</NavLink>
                )
              }
              {
                isLoggedIn && (
                  <NavLink className={({isActive})=>(isActive ? 'font-bold text-white bg-red-600 px-4 py-1 rounded-lg ' : ' bg-red-600 hover:bg-red-400 font-bold px-4 py-1 rounded-lg')} to='/logout' >Logout</NavLink>
                )
              }
            </div>
          
        <Outlet/>
        </div>x
       
      </div>
      
    
    )
}
export default App