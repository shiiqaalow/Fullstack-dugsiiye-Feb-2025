import TodoList  from "./TodoList"
const App = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(()=>{
    const handleWidth =()=>setWidth(window.innerWidth)
    window.addEventListener("resize",handleWidth)
  },[])
  return(
    <>
    <p>your window is: {width} px</p>
    </>
  )
}
export default App