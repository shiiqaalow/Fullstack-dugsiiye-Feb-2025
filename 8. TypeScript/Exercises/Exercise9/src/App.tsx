import { AgeForm } from "./components/AgeForm"
import { ContactForm } from "./components/ContactForm"
import { EmailForm } from "./components/EmailForm"

function App() {
  const handleEmailSubmit = (email: string) => {
    console.log('Email submitted:',email.toUpperCase())
  }
  const handleAgeSubmit = (age: number) => {
    console.log('age submitted:', age)
  }


  const handleFormSubmit = (data: {name: string,email:string}) => {
    console.log('Form submitted:', data)
  }

  return (
    <div className="app-container">
      {/* App */}
      <div className="app-components">
        <EmailForm onSubmit={handleEmailSubmit} />
        <AgeForm onSubmit={handleAgeSubmit} />
      </div>
      <div className="app-form">
        <ContactForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  )
}

export default App