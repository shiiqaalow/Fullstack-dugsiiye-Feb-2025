import { useState } from 'react'
import './App.css'

const App = ()=> {


  const [ formData,setFormData ] = useState( 
    {
      fullname:"",
      email:"",
      role:'',
      experience:'',
      skills:[],
      agreement:false,
      notification:false,
    } 
  )

  const skillList = [
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Python',
    'Java',
    'UI Design',
    'API Development',
  ]

  const [errorMessage,setErrorMessage] = useState({})

    const validName = /^[A-Za-z\s]+$/
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 

  const validateForm = () => {
    const errors = {}

    const trimmedName = formData.fullname.trim()

    if (!trimmedName) {
      errors.fullname = 'Full name is required';
    } else if (trimmedName.length < 2) {
      errors.fullname = 'Full name must be at least 2 characters long';
    } else if (!validName.test(trimmedName)) {
      errors.fullname = 'Only letters are allowed';
    }



    const trimmedEmail = formData.email.trim()

      if(!trimmedEmail){
        errors.email ='Email is required'
      }
      else if (!validEmail.test(trimmedEmail)){
        errors.email = ' Enter Valid Email '
      }



      if(!formData.role){
        errors.role ='Select Your Role'
      }
      
      const trimmedExp = formData.experience.trim()
      const num = Number(formData.experience)
       if(!trimmedExp) errors.experience = 'experience is required!'
      else if (isNaN(num) || num < 0 || num > 40) errors.experience = 'Experience must be between 0 upto 40'
    
      if(!formData.skills || formData.skills.length === 0){
        errors.skills ='At least 1 skill is required'
      }
      if(!formData.agreement){
        errors.agreement =' You must agree to our terms and policy '
      }
      if(!formData.notification){
        errors.notification =' Please Check it to receive the latest Notifications'
      }
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   
  const validationErrors = validateForm()

  if(Object.keys(validationErrors).length === 0){
    console.log('success',formData)
  }
  else(
      setErrorMessage(validationErrors)
  )
  console.log(formData)
  }

  const handleOnChange = (e) =>{
    const { name,value,type,checked } = e.target
    setFormData((prevData)=>({...prevData,[name] : type ==='checkbox' ? checked : value }))


    const newError = {...errorMessage}

    if(name==='fullname'){
      const trimmed = value.trim()
      if(!trimmed) newError.fullname = 'fullname is required!'
      else if(trimmed.length < 2 ) newError.fullname = ' Name must be 2-20 characters)'
      else if(!validName.test(trimmed)) newError.fullname = 'No numbers are allowed'
      else delete newError.fullname
    }
    if(name==='email'){

      const checkEMail = value.trim()
      if(!checkEMail) newError.email = 'Email is required!'
      else if(!validEmail.test(checkEMail)) newError.email = 'email must contain (@g and .)'
      else delete newError.email
    }

    if(name === 'role') {
      const role = value;
      if(!role) newError.role = 'role is required'
      else delete newError.role
    }

    if(name === 'experience'){
      const exp = Number(value)
      if(!exp) newError.experience = 'experience is required!'
      else if (isNaN(exp) || exp < 0 || exp > 40) newError.experience = 'only less than 40  is allowed'
      else delete newError.experience
    }

    if(name === 'agreement') {
      if(!checked){
        newError.agreement = 'you must agree to our terms and policy'
      }else {
        delete newError.agreement
      }
    }
    if(name === 'notification') {
      if(!checked){
        newError.notification = 'you must agree to our terms and policy'
      }else {
        delete newError.notification
      }
    }
    setErrorMessage (newError)

  }

  const handleSKills = (skill) => {
    setFormData((prevData)=>{
      const isSelectedSkills = prevData.skills.includes(skill)
      const updatedSkills = isSelectedSkills 
      ? prevData.skills.filter((old)=> old !== skill) 
      : [...prevData.skills,skill]

      const skillError = {...errorMessage} 

      if(updatedSkills.length === 0) {
        skillError.skills = 'At least 1 skill is required!'
      }
      else {
        delete skillError.skills
      }
      setErrorMessage(skillError)

      return {...prevData, skills:updatedSkills}

    })

  }

 
    return(
      <div className='min-h-screen bg-gradient-to-br from bg-pink-400 to to-purple-400'>
        <div className='max-w-4xl  flex justify-center '>
          <form onSubmit={handleSubmit} className='w-100 bg-white p-6 rounded-lg flex flex-col'>
            <h1 className='text-center text-gray-900 text-2xl mb-5 font-bold'>Developer Application Form</h1>
              <label className='font-bold'>FullName</label>
              <input 
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleOnChange}
              />
              {errorMessage.fullname &&( 
                <p className='  text-red-500'>{errorMessage.fullname}</p>
              )}
              <label className='font-bold'>Email</label>
              <input  
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange} 
              />   
                {errorMessage.email &&( 
                <p className='  text-red-500'>{errorMessage.email}</p>
              )}         
              <label className='font-bold'>Role</label>
              <select className='bg-gray-200 p-1 mb-2 rounded-lg' 
                name='role' value={formData.role} onChange={handleOnChange}>
                <option value="">select a role</option>
                <option value="Frontend Developer">Frontend Developer </option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="product Management">product Management</option>
              </select>
                {errorMessage.role &&( 
                <p className='  text-red-500'>{errorMessage.role}</p>
              )}
              <label className='font-bold'>Years of Experience</label>
              <input 
                type="number"  
                name="experience"
                value={formData.experience}
                onChange={handleOnChange}
              />
                {errorMessage.experience &&( 
                <p className='  text-red-500'>{errorMessage.experience}</p>
              )}
                <div>

                <div className="my-3">
                  <p className="font-bold mb-2">Skills</p>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2"> 
                    {
                      skillList.map((skill) => (
                      <label key={skill} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="skills"
                          checked={formData.skills.includes(skill)}
                          onChange={()=>handleSKills(skill)}
                        />
                        <span className="text-gray-700">{skill}</span>
                      </label>
                      ))
                    }
                  </div>

                  {errorMessage.skills && (
                    <p className="text-red-500 ">{errorMessage.skills}</p>
                  )}
                </div>

                </div>
                <div className='my-3'>
                  <div>
                    <input 
                      type="checkbox" 
                      name="agreement"
                      checked={formData.agreement} 
                      onChange={handleOnChange} 
                    />
                    <span className='ml-1'>I agree to the terms and conditions</span>
                  </div>
                   {errorMessage.agreement &&( 
                    <p className='  text-red-500'>{errorMessage.agreement}</p>
                  )}
                  <div>
                    <input 
                      type="checkbox" 
                      name="notification" 
                      checked={formData.notification} 
                      onChange={handleOnChange} 
                    />
                    <span className='ml-1'>Receive notifications about new opportunities</span>
                  </div>
                   {errorMessage.notification &&( 
                    <p className='  text-red-500'>{errorMessage.notification}</p>
                  )}
                </div>
                
           
              <button type="submit" className="bg-gradient-to-br from bg-pink-400 to to-purple-500 py-2 rounded-lg">Submit</button>
          </form>
        
        </div>
        
        
      </div>
    )
    
}
export default App