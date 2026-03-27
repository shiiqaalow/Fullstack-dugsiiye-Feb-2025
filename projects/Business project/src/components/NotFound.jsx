import React from 'react'

export const NotFound = () => {
  return (
    <div className='min-h-screen flex justify-center items-center text-white'>
      <div className="flex flex-col gap-3 text-center">
        <h1 className=' font-bold text-5xl'>404</h1>
        <h1 className=' font-bold text-2xl'>NotFound</h1>
        <p className=' text-md '>the page you looking cant be found</p>
      </div>
    </div>
  )
}
