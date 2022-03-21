import {
    GET_PRODUCTS, SEARCH_PRODUCTS, GET_DETAILS, ADD_CART, CLEAR_CART, DELETE_ONE_ITEM_FROM_CART, ADD_TO_FAVORITES, DELETE_FROM_FAVORITES, Get_ALL_FAVORITES,
    DELETE_ALL_SINGLE_ITEM_FROM_CART, SET_USER, CLEAN_DETAIL
} from "./actions"
const initialState = {
    product: [],
    detailproduct: {},
    shopingCart: [],
    haveResult: false,
    resultSearch: [],
    favoriteItems: [],
    user2: {},

}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                product: action.payload
            }

        case SEARCH_PRODUCTS:
            // console.log()
            if (!action.payload[0]) {
                return {
                    ...state,
                    resultSearch: action.payload,
                    haveResult: true
                }
            } else {

                return {
                    ...state,
                    resultSearch: action.payload,
                    haveResult: false
                }
            }


        case GET_DETAILS:
            // console.log(action.payload)
            return {
                ...state,
                detailproduct: action.payload
            }

        case ADD_CART:
            // console.log(state.shopingCart)
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
            let myDeleteProduct = state.shopingCart.find(product => product._id === action.payload)
            let myFilterProducts = state.shopingCart.filter(product => product !== myDeleteProduct)
            return {
                ...state,
                shopingCart: myFilterProducts,
            }

        case DELETE_ALL_SINGLE_ITEM_FROM_CART:
            let theItem = action.payload
            let itemsWithoutTheItem = state.shopingCart.filter(x => x._id !== theItem._id)
            return {
                ...state,
                shopingCart: itemsWithoutTheItem
            }

        case ADD_TO_FAVORITES:
            let myProductFavorite = action.payload
            let findProduct = state.favoriteItems.find(x => x._id === myProductFavorite._id)
            findProduct ? myProductFavorite = null : myProductFavorite = action.payload
            return {
                ...state,
                favoriteItems: [...state.favoriteItems, myProductFavorite]
            }

        case DELETE_FROM_FAVORITES:
            let myProductFavoriteToDelete = action.payload
            let myFilterFavoriteProducts = state.favoriteItems.filter(x => x !== myProductFavoriteToDelete)
            return {
                ...state,
                favoriteItems: myFilterFavoriteProducts
            }

        case Get_ALL_FAVORITES:
            return {
                ...state
            }

        case SET_USER:
            return {
                ...state,
                user2: action.payolad
            }

        case CLEAN_DETAIL:
            return {
                ...state,
                detailproduct: {}
            }


        default:
            return state
    } 
      
    }



