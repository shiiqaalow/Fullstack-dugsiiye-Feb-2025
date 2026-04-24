import { useReducer, useState } from "react"

  const initialState = {step: 1,FirstName:'', LastName:'', Email: '', Phone:''}

    const reducer = (state,action)=> {
        switch(action.type){
            case 'inputField' :
                return{...state,[action.field]: action.value}
            case 'Back' :
                return{...state,step: state.step - 1}
            case 'Next' :
                return{...state, step: state.step + 1}
            default : return state ;
        } 
    }

const MultiStepFrom = ()=>{

    const [state,dispatch] = useReducer(reducer,initialState)

    const handleInput=(e)=>{
        dispatch({
            type:'inputField',
            field:e.target.name,
            value:e.target.value
        })
            console.log(state)
    }

    const handleNext=(e)=>{
        e.preventDefault()
        if(state.step < 3){
            dispatch({type:'Next'})
        }
        else {
            alert("Form Submitted Successfully!🔥🤵‍♂️👉")
        }
    }
   
        
    return(
        <div>
                
            { state.step ===1 && ( 
                <form onSubmit={handleNext}>
                    <div>
                        <h1>step:1 Profile</h1>
                        <label htmlFor="First Name">First Name: </label>
                        <input 
                            type="text"
                            name="FirstName" 
                            value={state.FirstName}
                            onChange={handleInput}
                            required
                        /> 
                    </div>
                    <div>
                        <label htmlFor="Last Name">Last Name: </label>
                        <input 
                            type="text" 
                            name="LastName"
                            value={state.LastName}
                            onChange={handleInput}
                            required
                        /> 
                    </div>
                    <div>
                        <button disabled={state.step==1} onClick={()=>dispatch({type:'Back'})}>Back</button>
                        <button type="submit">Next</button>
                    </div>
                  
                </form>

            )}
            
            { state.step ===2 && ( 
                <form onSubmit={handleNext}>
                    <div>
                        <h1>step:2 Contact</h1>
                        <label htmlFor="Email">Email: </label>
                        <input 
                            type="text"
                            name="Email" 
                            value={state.Email}
                            onChange={handleInput}
                            required
                        /> 
                    </div>
                    <div>
                        <label htmlFor="Phone">Phone: </label>
                        <input 
                            type="text" 
                            name="Phone"
                            value={state.Phone}
                            onChange={handleInput}
                            required
                        /> 
                    </div>
                    <div>
                        <button onClick={()=>dispatch({type:'Back'})}>Back</button>
                        <button type="submit">Next</button>
                    </div>
                </form>

            )}

            {state.step === 3 && (
                <form onSubmit={handleNext}>
                    <h2>Step 3: Review</h2>
                    <p><strong>First Name: </strong>{state.FirstName}</p>
                    <p><strong>Last Name: </strong> {state.LastName}</p>
                    <p><strong>Email: </strong> {state.Email}</p>
                    <p><strong>Phone: </strong> {state.Phone}</p>
                    <div>
                        <button onClick={()=>dispatch({type:'Back'})}>Back</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
               
            )}
                
        </div>
    )


}

export default MultiStepFrom