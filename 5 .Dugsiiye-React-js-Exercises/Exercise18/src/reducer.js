export const initialState = []

export const reducer = (state,action)=> {
    switch(action.type){
        case'add':
            return [...state,action.payload]
        case'toggleFavorite':
            return state.map((form)=>form.id === action.payload ? 
                { ...form, favorite: !form.favorite } : form)
        case'edit':
             return state.map((form)=>form.id === action.payload.id ? {...form,...action.payload.data} : form)
        case'delete':
            return state.filter((form)=> form.id !== action.payload)
        default: return state;
    }
}