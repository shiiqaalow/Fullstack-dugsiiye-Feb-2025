
import './App.css'
import { Outlet,NavLink } from 'react-router'

const App = ()=> {


    return(
      <div className='min-h-screen  bg-gradient-to-br from-gray-400 via-rose-300 to-gray-400 '>
        <div className='w-4xl mx-auto'>
          <nav className=" flex justify-between space-x-5 p-6 text-xl cursor-pointer shadow-lg">
            <div>
              <h1 className='font-bold font-2xl text-rose-600'>Recipe Book</h1>
            </div>
            <div className='space-x-7'>
              <NavLink className={({isActive})=>(isActive ? 'font-bold text-rose-600 ' : 'undefined')} to='/'>Home</NavLink>
              <NavLink className={({isActive})=>(isActive ? 'font-bold text-rose-600 ' : 'undefined')} to='/recipes' >Recipes</NavLink>
              <NavLink className={({isActive})=>(isActive ? 'font-bold text-rose-600 ' : 'undefined')} to='/categories' >Categories</NavLink>
            </div>
          
        </nav>
        <Outlet/>
        </div>
       
      </div>
      
    
    )
}
export default App