import { useEffect, useState } from "react"

function useNumberStorage(key: string, initialValue: number): [number, (value: number)=>void] {
    // get data from localStorage
    const getDataFromLocalStorage = () => {
        const stored = localStorage.getItem(key)
        return stored ? parseInt(stored) : initialValue
    }
    // set/save data to localStorage
    const setDataToLocalStorage = () => {
        const item = localStorage.setItem(key,JSON.stringify(value))
        return item
    }
    const [value,setValue] = useState<number>(getDataFromLocalStorage)

    useEffect(()=>{
        setDataToLocalStorage()
    },[value,setValue])
  return [value,setValue]
}

export default useNumberStorage