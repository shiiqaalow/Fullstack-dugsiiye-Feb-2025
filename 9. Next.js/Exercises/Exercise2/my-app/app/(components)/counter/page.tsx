"use client"
import { useState } from 'react'
const Counter = () => {
    const [count,setCount] = useState<number>(0)
    const handleIncrement = () => {
        setCount(count+1)
    }
    const handleDecrement = () => {
        if(count <= 0) {
            setCount(0)
        }else {
            setCount(count-1)
        }
    }
  return (
    <>
        {/* <h1>Counter Component(Client)</h1>     */}
        <div className='bg-gray-200 p-4 rounded-md space-y-4 w-80 md:w-md'>
            <h3 className='text-center'>Counter(Client)</h3>
            <h2 className="w-fit bg-white text-5xl text-center px-4 py-2 rounded-lg shadow-sm mx-auto">
                {count}
            </h2>
            <div className="flex justify-between items-center">
                <button
                onClick={handleDecrement} 
                className='bg-red-300 py-2 px-10 md:px-20 rounded-md flex justify-center items-center cursor-pointer font-bold'>
                    -
                </button>
                <button
                onClick={handleIncrement} 
                className='bg-green-300 py-2 px-10 md:px-20 rounded-md flex justify-center items-center cursor-pointer font-bold'>
                    +
                </button>
            </div>
        </div>
    </>
  )
}

export default Counter