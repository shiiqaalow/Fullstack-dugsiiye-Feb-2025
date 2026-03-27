import { useReducer } from "react"

const initialState = {countA :0 , countB :0}

const reducer = (state,action)=>{
        switch(action.type){
                case 'incrementA' :
                        return{...state,countA: state.countA + 1}
                case 'decrementA' :
                        return{...state,countA: state.countA - 1}
                case 'incrementB' :
                        return{...state,countB: state.countB + 1}
                case 'decrementB' :
                        return{...state,countB: state.countB - 1}
                case 'resetBoth' :
                        return{countA:0,countB:0}
                default : return ;
        }
}

const DoubleCounterWithReducer = ()=>{
        const [state,dispatch] = useReducer(reducer,initialState)

        return(
                <div>
                        <h1>Double Counter</h1>
                        <div>
                                <h3>Counter A : {state.countA}  </h3>
                                <button onClick={()=>dispatch({type:'incrementA'})}> +A </button>
                                <button disabled={state.countA===0} onClick={()=>dispatch({type:'decrementA'})}> -A </button>
                        </div>
                        <div>
                                <h3>Counter B : {state.countB}  </h3>
                                <button onClick={()=>dispatch({type:'incrementB'})}> +B </button>
                                <button disabled={state.countB===0} onClick={()=>dispatch({type:'decrementB'})}> -B </button>
                        </div>
                        <div>
                                <button onClick={()=>dispatch({type:'resetBoth'})}> Reset Both </button>
                        </div>
                </div>
        )
}

export default DoubleCounterWithReducer ;