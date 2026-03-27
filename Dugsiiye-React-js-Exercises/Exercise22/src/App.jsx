import { useState } from 'react'

const App = ()=> {


  const [ formData,setFormData ] = useState( {username:"",email:"",password:""} )
  const [ isChecked,setIsChecked ] = useState(false)
  const [ selectedOption,setSelectedOption ] = useState("")


  const handleFormData = (e)=> {
    const {name,value} = e.target;
    setFormData((prev)=>({...prev,[name]:value}))
  }
  const handleSubmit = (e)=> {
    e.preventDefault()
    if(formData.username===""){
      alert("please Enter the username")
      return
    }
    if(formData.email===""){
      alert("please Enter the email")
      return
    }
    if(formData.password===""){
      alert("please Enter the password")
      return
    }
    alert('form submitted Successfully')
    console.log('formData:', formData)
    console.log('Checked:' , isChecked)
    console.log('selectedOption:', selectedOption)
  }
 
    return(
      <div className='min-h-screen bg-gradient-to-br from bg-pink-400 to to-purple-400'>
        <div className='max-w-4xl mx-auto p-5 '>
          <form onSubmit={handleSubmit} className='w-100 bg-amber-200 p-4 rounded-lg flex flex-col gap-3'>
              <label htmlFor="">Username: </label>
              <input className='bg-gray-200 p-1 rounded-lg'
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormData}
              />
              <label htmlFor="">Email: </label>
              <input className='bg-gray-200 p-1 rounded-lg' 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormData} 
              />
              <label htmlFor="">Password: </label>
              <input className='bg-gray-200 p-1 rounded-lg' 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormData} 
              />
              <div className="flex justify-around items-center bg-gray-200 rounded-lg py-2 my-3">
                <div className="flex items-center gap-1">
                  <label htmlFor="">select</label>
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e)=>setIsChecked(e.target.checked)}
                  />
                </div>
                <select value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
                  <option value="Option">select</option>
                  <option value="Option1">Option 1</option>
                  <option value="Option2">Option 2</option>
                  <option value="Option3">Option 3</option>
                </select>
              
              </div>
              <button type="submit" className="bg-gradient-to-br from bg-pink-400 to to-purple-500 py-2 rounded-lg">Submit</button>
          </form>
          <div className="bg-blue-400 p-5 my-4 rounded-lg w-100 flex flex-col gap-3 ">
            <h2 className="text-xl text-center text-white font-bold">See the updates in realtime instead of checking the console</h2>
            <h3 className="bg-green-100 text-green-700 font-bold text-xl rounded-lg pl-3"> Username: {formData.username} </h3>
            <h3 className="bg-green-100 text-green-700 font-bold text-xl rounded-lg pl-3"> Email: {formData.email} </h3>
            <h3 className="bg-green-100 text-green-700 font-bold text-xl rounded-lg pl-3"> Password: {formData.password} </h3>
            <h3 className="bg-green-100 text-green-700 font-bold text-xl rounded-lg pl-3"> isChecked: {isChecked ? 'true': 'false'} </h3>
            <h3 className="bg-green-100 text-green-700 font-bold text-xl rounded-lg pl-3"> selectedOption: {selectedOption} </h3>
        </div>
        </div>
        
        
      </div>
    )
    
}
export default App