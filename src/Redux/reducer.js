import { GET_PRODUCTS, SEARCH_PRODUCTS, GET_DETAILS, ADD_CART, CLEAR_CART, 
    DELETE_ONE_ITEM_FROM_CART

} from "./actions"
const initialState = {
    product: [],
    detailproduct: {},
    shopingCart: [],
    haveResult: false,

}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                product: action.payload
            }

        case SEARCH_PRODUCTS:
            console.log()
            if (!action.payload[0]) {
                return {
                    ...state,
                    product: action.payload,
                    haveResult: true
                }
            } else {

                return {
                    ...state,
                    product: action.payload,
                    haveResult: false
                }
            }


        case GET_DETAILS:
            return {
                ...state,
                detailproduct: action.payload
            }

        case ADD_CART:
           // console.log(action.payload)
            return {
                ...state,
                shopingCart: [...state.shopingCart, action.payload]
            }

        case CLEAR_CART:
            return {
                ...state,
                shopingCart: []
            }

        case DELETE_ONE_ITEM_FROM_CART:
            let myDeleteProduct = state.shopingCart.find(product=> product.id === action.payload)
            let myFilterProducts = state.shopingCart.filter(product=> product !== myDeleteProduct)
            return {
                ...state,
                shopingCart: myFilterProducts,
            }

        default:
            return state
    }

}