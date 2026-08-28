import React from 'react'

const SlowComponent = async () => {
    await new Promise(resolve => setTimeout(resolve,3000))
  return (
    <div className='text-2xl font-bold bg-gray-300 p-3 rounded-md'>
        Slow Component
    </div>
  )
}

export default SlowComponent