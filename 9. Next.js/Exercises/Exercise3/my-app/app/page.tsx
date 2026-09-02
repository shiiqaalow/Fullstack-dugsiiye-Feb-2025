"use client"
import { useActionState } from 'react'
import greet from './form/actions'

const HomePage = () => {
const initial = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  successMessage: "",
  errorMessage: ""
}
  const [state,formAction] = useActionState(greet,initial)
  return (
    <div className='min-h-screen flex flex-col items-center p-5 space-y-5'>
      <h2 className="text-3xl">
        Home Page
      </h2>
      <form 
        action={formAction}
        className='flex flex-col gap-2 bg-gray-100 w-md rounded-md p-5'>
          <h1 className="my-7 text-3xl text-center uppercase font-semibold">Login</h1>
        <label htmlFor="">FirstName</label>
        <input 
          type="text"
          name='firstName'
          placeholder='FirstName'
          className='border-2 border-blue-400 focus:border-none focus:outline-1 focus:ring-2 focus:ring-blue-400 rounded-md py-1 pl-3' 
        />

        <label htmlFor="">LastName</label>
        <input 
          type="text"
          name='lastName'
          placeholder='LastName'
          className='border-2 border-blue-400 focus:border-none focus:outline-1 focus:ring-2 focus:ring-blue-400 rounded-md py-1 pl-3' 
        />

        <label htmlFor="">Email</label>
        <input 
          type="email"
          name='email'
          placeholder='Email'
          className='border-2 border-blue-400 focus:border-none focus:outline-1 focus:ring-2 focus:ring-blue-400 rounded-md py-1 pl-3' 
        />

        <label htmlFor="">Password</label>
        <input 
          type="password"
          name='password'
          placeholder='Password'
          className='border-2 border-blue-400 focus:border-none focus:outline-1 focus:ring-2 focus:ring-blue-400 rounded-md py-1 pl-3' 
        />
        <button
          type='submit'
          className='bg-blue-400 p-2 rounded-md mt-3 cursor-pointer hover:scale-99'
        >Login</button>
      </form>
      {
        (state.successMessage || state.errorMessage) && (
          <div className="flex flex-col gap-3 bg-gray-100 w-md rounded-md p-5">
            <p className='text-xl'>firstName: {""}{state.firstName}</p>
            <p className='text-xl'>lastName: {""}{state.lastName}</p>
            <p className='text-xl'>Email: {""}{state.email}</p>
            <p className='text-xl' >Password: {""}{state.password}</p>
            <p className={`text-xl font-semibold ${state.successMessage ? 'text-green-600' : 'text-red-600'}`}>Message: {""}{state.successMessage || state.errorMessage}</p>

          </div>
        )
      }
    </div>
  )
}

export default HomePage