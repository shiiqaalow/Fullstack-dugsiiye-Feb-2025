import { useEffect, useState } from "react"

export interface SettingStorage {
    language: string,
    notification: boolean
}
function useSettingStorage(key: string,initialValue: SettingStorage): [SettingStorage,(value: SettingStorage)=>void] {
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
    const [value,setValue] = useState<SettingStorage>(getDataFromLocalStorage)

    useEffect(()=>{
        setDataToLocalStorage()
    },[value,setValue])

  return [value,setValue]
}

export default useSettingStorage