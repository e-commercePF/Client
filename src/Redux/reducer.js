import { GET_PRODUCTS, SEARCH_PRODUCTS, GET_DETAILS, ADD_CART } from "./actions"
const initialState = {
    product: [],
    detailproduct: {},
    shopingCart: [],

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

        case ADD_CART:
            console.log(action.payload)
            return {
                ...state,
                shopingCart: [...state.shopingCart, action.payload]
            }

        default:
            return state
    }

}