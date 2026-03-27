
import { useForm } from 'react-hook-form'
import './App.css'
import { useState } from 'react'

const App = ()=> {


    const { register,handleSubmit, reset,formState:{errors,isSubmitting} } = useForm()
    const [ isLoading,setIsLoading ] = useState(false)

    
    const subjects = [
    'Islamic',
    'Mathematics',
    'English',
    'Science',
    'Chemistry',
    'Biology',
    ]

    const onSubmit = async (data) => {
      setIsLoading(true)

      await new Promise((resolve)=>setTimeout(resolve,1500))

      alert(`Registered Successfully${JSON.stringify(data,null,2)}`)
      reset()
      setIsLoading(false)
    }

    const handleReset = () => {
      reset()
    }

    return(
      <div className='min-h-screen bg-gradient-to-br from bg-pink-400 to to-purple-400'>
    
        <div className='relative max-w-4xl  mx-auto flex justify-center '>
          <form onSubmit={handleSubmit(onSubmit)} className='relative flex flex-col gap-2 w-100 bg-white p-6 rounded-lg '>
              {
                isLoading && (
                    <div className="absolute top-70  w-90 p-6 rounded-lg  flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 to-purple-400 bg-opacity-90 backdrop-blur-sm z-50 transition-opacity duration-500">
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <p className="mt-4 text-white text-lg font-bold">Submitting...</p>
                    </div>
                )
              }
            <h1 className='text-center text-gray-900 text-2xl mb-5 font-bold'>Student Registration</h1>
            <div className='flex flex-col'>
              <label className='font-bold'>StudentName</label>
              <input 
                type="text"
                {...register('studentName',{
                  required:'studentName is required',
                  minLength:{
                    value:4,
                    message:'Name must be 4 or more characters'
                  },
                  pattern:{
                    value: /^[A-Za-z\s]+$/,
                    message:'Only letters are valid'
                  }
                })}
              />
              {errors.studentName &&( 
                <p className='  text-red-500'>{errors.studentName.message}</p>
              )}
            </div>
           
              <div className='flex flex-col'>
                <label className='font-bold'>Email</label>
                <input  
                  type="email"
                  {...register('email',{
                    required:'Email is required',
                    pattern:{
                      value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message:'Email is invalid'
                    }
                  })}               
                />  
                {errors.email &&( 
                  <p className='  text-red-500'>{errors.email.message}</p>
                )}
              </div>
            
              
              <div className='flex flex-col'>
                <label className='font-bold'>Grade Level</label>
                <select className='bg-gray-200 p-1 mb-2 rounded-lg'
                  {...register('role',{
                    required:'Select your role'
                  })}>
                  <option value="">Select Your Grade</option>
                  <option value="Grade9">Grade 9</option>
                  <option value="Grade10">Grade 10</option>
                  <option value="Grade11">Grade 11 </option>
                  <option value="Grade12">Grade 12</option>
                </select>
                {errors.role &&( 
                  <p className='  text-red-500'>{errors.role.message}</p>
                )}
              </div>
 
             
                
                <div className='flex flex-col'>

                <div className="my-3">
                  <p className="font-bold mb-2">Subjects interest:</p>

                  <div className="flex flex-col gap-2 "> 
                    {
                      subjects.map((subject) => (
                      <label key={subject} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={subject}
                          {...register('subjects',{
                            required:'At least 1 subject is required'
                          })}  
                        />
                        <span className="text-gray-700">{subject}</span>
                      </label>
                      ))
                      
                    }
                    {errors.subjects &&( 
                      <p className='  text-red-500'>{errors.subjects.message}</p>
                    )}
                  </div>

        
                </div>

                </div>
                <div className='flex justify-evenly'>
                  <button type="submit" className="w-40 bg-gradient-to-br from bg-blue-400 to to-cyan-500 py-2 rounded-lg">{isLoading ? 'Registering...' : 'Register'}</button>
                  <button type="reset" onClick={handleReset} className="w-40 bg-gradient-to-br from bg-green-400 to to-yellow-500 py-2 rounded-lg">Reset</button>
                </div>
           
              
          </form>
        
        </div>
        
        
      </div>
    
    )
}
export default App