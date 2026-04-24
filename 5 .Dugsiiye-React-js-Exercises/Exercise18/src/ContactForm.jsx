import { useContext,useState } from "react"
import { ContactContext } from "./ContactContext"

export const ContactForm = ()=> {
    const [inputValues,setInputValues] = useState({name:'',email:'',phone:''})
    const {dispatch,editContact,setEditContact} = useContext(ContactContext)

     const handleChange = (e)=> {
         const { name,value } = e.target
        setInputValues((prev)=>({...prev,[name]:value}))
     }

    const handleAddUpdate = ()=> {

        if (!inputValues.name || !inputValues.email || !inputValues.phone) return;

        if (editContact) {
            dispatch({
                type: "edit",
                payload: { id: editContact.id, data: inputValues },
            });

      setEditContact(null);

        } else {
            const newContact = {
                id: Date.now(),
                ...inputValues,
                favorite: false,
            };
        dispatch({ type: "add", payload: newContact });
        }

        setInputValues({ name: "", email: "", phone: "" });
    };
       
     

    const handleEdit = ()=>{
        
        dispatch({ type:'edit', payload:{ id: editContact.id, data: inputValues }})
        setEditContact(null)
        setInputValues({name:inputValues.name,email:inputValues.email,phone:inputValues.phone})
    }

    if ( editContact && inputValues.name === "" && inputValues.email === "" && inputValues.phone === "" ) {
        setInputValues({
        name: editContact.name,
        email: editContact.email,
        phone: editContact.phone,
        });
    }

    return(
        <div>
            <h3>{editContact ? 'Edit Contact' : 'Add New Contact'}</h3>
            <form onSubmit={(e)=>e.preventDefault()}>
                <div>
                    <label htmlFor="name">Name : </label>
                    <input 
                        name='name'
                        type="text" 
                        placeholder="Enter Your Name"
                        value={inputValues.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Email : </label>
                    <input 
                        name="email"
                        type="email" 
                        placeholder="Enter Your Email Address"
                        value={inputValues.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Phone : </label>
                    <input 
                        name="phone"
                        type="text" 
                        placeholder="Enter Your Phone Number"
                        value={inputValues.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button onClick={handleAddUpdate} type="submit">{ editContact ? 'Update' : 'Add' }</button>
                {editContact && (
                    <button onClick={handleEdit}>Cancel</button>
                )}
               
            </form>

        </div>
    )
}