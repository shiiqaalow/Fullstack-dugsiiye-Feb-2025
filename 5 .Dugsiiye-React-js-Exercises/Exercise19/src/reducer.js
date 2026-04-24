export const initialState = []

export const reducer = (state,action)=> {
    switch(action.type) {
        case 'add' :
            return [...state,action.payload]
        case 'edit' :
            return state.map((todo)=>todo.id === action.payload ? {...state,...action.payload}: todo)
        case 'delete' :
            return state.filter((record)=>record.id !== action.payload )
        case 'toggleCompleted' : 
            return  state.map((todo)=>todo.id === action.payload ? {...todo,completed:!todo.completed} : todo)
        default : state;
    }
}