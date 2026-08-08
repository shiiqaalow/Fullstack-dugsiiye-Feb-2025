import React, { useState } from "react";

interface ContactFormProps {
    onSubmit: (data: {name: string; email: string}) => void
}
interface FormDataState {
    name: string,
    email: string,
    default?: string
}
export const ContactForm = ({onSubmit}: ContactFormProps) => {
    const [formData,setFormData] = useState<FormDataState>({name: '',email:''})
    const [submittedData,setSubmittedData] = useState<{name: string,email: string} | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        // setFormData(prev =>({...prev,[name]:value}))
        setFormData((prev=>({...prev,[name]:value})))
    }

    const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(formData.name === '') {
            alert('fill the Name field')
            return
        }

        if(formData.email === '') {
            alert('fill the Email field')
            return
        }  
        onSubmit(formData)
        setSubmittedData(formData)
        setFormData({name:'',email:''})
    }

  return (
    <div className='contact-form'>
        <form onSubmit={handleFormSubmit}>
            <h2>Contact Form</h2>
            {/* name */}
            <label htmlFor="Name">Name</label>
            <input 
                type="text"
                placeholder="Name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            {/* email */}
            <label htmlFor="Name">Email</label>
            <input 
                type="email" 
                placeholder="Email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <button type='submit' >Submit</button>
        </form>
        <h3>Name: {submittedData?.name}</h3>
        <h3>Email: {submittedData?.email}</h3>
    </div>
  )
}
