import {useState } from "react"
import {TranslateContext} from "./TranslateContext"
import Translate from "./Translate"

const App =()=>{
  const [translate,setTranslate] = useState('eng')

  const handleTranslate=()=>{
    setTranslate((prev)=>(prev==='eng' ? 'spain' : 'eng'))
  }

  return(
    <TranslateContext.Provider value={{translate,setTranslate}}>
      <Translate/>
    <button onClick={handleTranslate}><strong>Translate to: </strong>{translate === 'eng' ? 'Spain' : 'English'} </button>

    </TranslateContext.Provider>
  )
}
export default  App