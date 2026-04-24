import { useContext } from "react"
import { ContactContext } from "./ContactContext"
export const ContactItem = ({form})=> {
    const {dispatch,setEditContact} = useContext(ContactContext)

    return(
       <li>
            <h3>{form.name} {form.favorite?'⭐':''}</h3>
            <p>Email: {form.email}</p>
            <p>Phone: {form.phone}</p>
            <button onClick={()=>dispatch({type:'toggleFavorite',payload:form.id})}>{ form.favorite ? 'Unfavorite' : 'Favorite' } </button>
            <button onClick={()=>{setEditContact(form)}}>Edit </button> 
            <button onClick={()=>dispatch({type:'delete',payload:form.id})}>Delete </button>

       </li>
    )
}