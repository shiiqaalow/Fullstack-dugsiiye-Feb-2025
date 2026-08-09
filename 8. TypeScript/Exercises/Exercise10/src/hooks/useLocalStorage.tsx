import { useState,useEffect } from 'react'

function useLocalStorage<T> (key: string, initialValue: T): [T,(value: T)=>void]  {
    // get data from localStorage
    const getDataFromLocalStorage = () => {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : initialValue
    }
     // set/save data to localStorage
    const setDataToLocalStorage = () => {
        const item = localStorage.setItem(key,JSON.stringify(value))
        return item
    }
    const [value,setValue] = useState<T>(getDataFromLocalStorage)
    
    useEffect(()=>{
        setDataToLocalStorage()
    },[value,setValue])
    
    return [value,setValue]
}

export default useLocalStorage