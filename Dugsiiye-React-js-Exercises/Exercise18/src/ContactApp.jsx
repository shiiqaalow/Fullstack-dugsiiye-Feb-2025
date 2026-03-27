import { useReducer,useState } from "react" 
import { initialState,reducer } from "./reducer"
import { ContactContext } from "./ContactContext"
import { ContactForm } from "./ContactForm"
import { ContactList } from "./ContactList"

export const ContactApp = ()=> {
    const [state,dispatch] = useReducer(reducer,initialState)
    const [editContact, setEditContact] = useState(null);

    return(
        <ContactContext.Provider value={{ state, dispatch, editContact, setEditContact}}>
            <h2>Contact Managing App</h2>
            <ContactForm/>
            <ContactList/>
        </ContactContext.Provider>
    )
}