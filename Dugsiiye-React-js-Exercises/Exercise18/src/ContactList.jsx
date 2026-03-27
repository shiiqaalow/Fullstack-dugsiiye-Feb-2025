import { useContext } from "react";
import { ContactContext } from "./ContactContext";
import { ContactItem } from "./ContactItem";

export const ContactList = () => {
  const { state } = useContext(ContactContext);

  return (
    <div>
      <h3>Contacts</h3>
      {
        state.length > 0 ? (
            state.map((form)=>(
                <ContactItem key={form.id} form={form}/>
            ))
        ) : (<p>No contacts available...</p>)
      }
    
    </div>
  );
};
