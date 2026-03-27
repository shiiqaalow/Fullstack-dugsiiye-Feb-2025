
  const App = () => {
    return(
      <div className='min-h-screen bg-gradient-to-br from bg-purple-300 to to-yellow-200'>

          <div className="max-w-4xl mx-auto p-5">

            <div className="bg-white py-4 px-5 flex justify-between items-center rounded-lg mb-5">
              <div className=''>
                <h1 className='text-xl font-bold text-gray-900'>Welcome back, Student!</h1>
                <p  className=' text-gray-700'>Here's what's happening with your courses today</p>
              </div>
              <div className='flex gap-5'>
                <span className='text-white px-2 rounded-full bg-gradient-to-l from bg-cyan-500 ring-offset-blue-400 to bg-rose-400 to-green-400'>🔔</span>
                <span className='text-white px-2 rounded-full bg-gradient-to-l from bg-purple-500 ring-offset-rose-400 to bg-red-400 to-blue-400'>S</span>
              </div>
            </div>

            <div className=" grid grid-cols-1  gap-5 md:grid-cols-4 ">
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl">
                <div className='text-2xl'>📊</div>
                <div>
                  <h1 className='text-gray-600'>Average Grade</h1>
                  <h1 className='text-xl font-bold '>88%</h1>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl">
                <div className='text-2xl'>📚</div>
                <div>
                  <h1 className='text-gray-600'>Courses</h1>
                  <h1 className='text-xl font-bold '>3</h1>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl">
                <div className='text-2xl'>⏰</div>
                <div>
                  <h1 className='text-gray-600'>Study Hours</h1>
                  <h1 className='text-xl font-bold '>45h</h1>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl">
                <div className='text-2xl'>✍️</div>
                <div>
                  <h1 className='text-gray-600'>Assignments</h1>
                  <h1 className='text-xl font-bold '>12</h1>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-7 ">
              <div className=" basis-2/3 bg-white rounded-xl">
                <div className='flex flex-col gap-3 py-4 px-5'>
                  <h1 className='text-xl font-bold tex-gray-900'>Courses Progress</h1>
                  <div className="bg-gray-100 p-5 rounded-xl">
                    <div className='flex justify-between items-center'>
                      <span>React Fundamentals</span>
                      <span className='text-gray-700'>75%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="w-40 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex justify-between items-center gap-1 text-gray-600">
                      <span>Next: Components & props</span>
                      <span>Eng Hassan</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-5 rounded-xl">
                    <div className='flex justify-between items-center'>
                    <span>JavaScript Advanced</span>
                    <span className='text-gray-700'>45%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="w-30 h-3 rounded-full bg-yellow-500"></div>
                    </div>
                    <div className="flex justify-between items-center gap-1 text-gray-600">
                      <span>Next: Async/Await</span>
                      <span>Eng Qanjey</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-5 rounded-xl">
                    <div className='flex justify-between items-center'>
                    <span>React UI/UX Design</span>
                    <span className='text-gray-700'>90%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="w-60 h-3 rounded-full bg-cyan-500"></div>
                    </div>
                    <div className="flex justify-between items-center gap-1 text-gray-600">
                      <span>Next: Color Theory</span>
                      <span>Eng Shiiqaalow</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="basis-1/3 flex flex-col gap-3 rounded-xl">
                <div className="bg-white py-4 px-3 text-sm rounded-xl">
                  <div className='flex flex-col gap-3'>
                    <h1 className='text-xl text-gray-900 font-bold'>Upcoming Assignments</h1>
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <span className='text-l text-gray-800 font-bold'>Build a Todo App</span>
                        <span className='bg-red-200 text-red-500 font-bold px-1.5  rounded-full'>Pending</span>
                      </div>
                      <div className="flex justify-between">
                        <span>React Fundamentals </span>
                        <span>Due 2025-10-24</span>
                      </div>
                     
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <span className='text-l text-gray-800 font-bold'>API Integration</span>
                        <span className='bg-green-200 text-green-500 font-bold px-1.5  rounded-full'>Completed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>JavaScript Advanced </span>
                        <span>Due 2025-08-15</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <span className='text-l text-gray-800 font-bold'>Design System</span>
                        <span className='bg-yellow-200 text-yellow-700 font-bold px-1.5  rounded-full'>in-progress</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ui/UX Design </span>
                        <span>Due 2025-10-25</span>
                      </div>
                    </div>
                    
                  </div>
                 
                 
                </div>

                <div className="bg-white py-4 px-2 text-sm rounded-xl">
                  <div className='flex flex-col gap-3'>
                    <h1 className='text-xl text-gray-900 font-bold'>Announcements</h1>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col border-l-4 border-blue-500 px-2">
                        <span className='text-l text-gray-800 font-bold'>New Courses Available</span>
                        <span>Check out our new TypeScript course</span>
                        <span className='text-gray-400'>2 hours ago</span>
                      </div>
                      <div className="flex flex-col border-l-4 border-blue-500 px-2">
                        <span className='text-l text-gray-800 font-bold'>New Courses Available</span>
                        <span>Check out our new TypeScript course</span>
                        <span className='text-gray-400'>2 hours ago</span>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      
    )
}
export default App
