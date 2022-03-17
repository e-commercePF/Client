import { GET_PRODUCTS, SEARCH_PRODUCTS, GET_DETAILS } from "./actions"
const initialState = {
    product: [],
    detailproduct: {},

}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                product: action.payload
            }

        case SEARCH_PRODUCTS:
            console.log(1111, action.payload)
            return {
                ...state,
                product: action.payload
            }

        case GET_DETAILS:
            return {
                ...state,
                detailproduct: action.payload
            }

        default:
            return state
    }

}