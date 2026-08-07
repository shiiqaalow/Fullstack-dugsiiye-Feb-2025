import React, { useEffect, useRef, useState } from 'react'
interface EmailFormProps {
    onSubmit: (email: string) => void
}
export const EmailForm = ({onSubmit}: EmailFormProps) => {
    const [email,setEmail] = useState<string>('')
    const [savedEmail,setSavedEmail] = useState<string>('')
    const useInputRef = useRef<HTMLInputElement>(null)
    useEffect(()=> {
        if(useInputRef.current){
            useInputRef.current.focus()
        }
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleEmailSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(email)
        setSavedEmail(email)
        setEmail('')
    }

    return (
        <div className='email-form'>
            <form onSubmit={handleEmailSubmit}>
                <h2>Email Form</h2>
                <input 
                    type="text"
                    ref={useInputRef}
                    value={email}
                    onChange={handleChange}
                    placeholder='Email'
                />
                <button type='submit' >Set Email</button>
            </form>
            <h3>Email: {savedEmail}</h3>
        </div>
    )
}
