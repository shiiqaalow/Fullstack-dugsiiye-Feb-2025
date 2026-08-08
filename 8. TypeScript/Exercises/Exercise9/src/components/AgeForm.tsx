import React, { useState } from 'react'
interface AgeFormProps {
    onSubmit: (age: number) => void
}
export const AgeForm = ({onSubmit}: AgeFormProps) => {
    const [age,setAge] = useState<number | ''>('')
    const [savedAge,setSavedAge] = useState<number>(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setAge(value === '' ? '' : Number(value))
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(age === '' || age < 18) {
            alert('No Teenegers is allowed to submit here.')
            return
        }
        onSubmit(age)
        setSavedAge(age)
        setAge('')

    }

    return (
        <div className='age-form'>
            <form onSubmit={handleSubmit}>
                <h2>Age Form</h2>
                <input 
                    type="number"
                    value={age}
                    onChange={handleChange}
                    placeholder='Age'
                />
                <button type='submit' >Set Age</button>
            </form>
            <h3>Age: {savedAge}</h3>
        </div>
    )
}
