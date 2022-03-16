const initialState = []

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case  "GET_PRODUCTS":
            return {
              ...state,
              initialState:action.payload 
            }

        default:
            return state 
    }

}