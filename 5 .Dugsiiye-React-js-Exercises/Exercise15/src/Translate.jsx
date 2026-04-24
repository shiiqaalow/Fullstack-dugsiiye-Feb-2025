import { useContext } from "react"
import  {TranslateContext}  from "./TranslateContext"

const Translate = ()=>{
    const {translate} = useContext(TranslateContext)

    return(
        <h1>{translate === 'eng' ? 'Hello!👋' : '!Hola!🖐️'}</h1>
    )
}

export default Translate