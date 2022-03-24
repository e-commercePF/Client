import axios from 'axios';
export const GET_PRODUCTS = "GET_PRODUCTS"
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"
export const GET_DETAILS = "GET_DETAILS"
export const ADD_CART = "ADD_CART"
export const CLEAR_CART = "CLEAR_CART"
export const DELETE_ONE_ITEM_FROM_CART = "DELETE_ONE_ITEM_FROM_CART"
export const SET_USER = "SET_USER"
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
export const DELETE_FROM_FAVORITES = 'DELETE_FROM_FAVORITES'
export const DELETE_ALL_SINGLE_ITEM_FROM_CART = 'DELETE_ALL_SINGLE_ITEM_FROM_CART'
export const Get_ALL_FAVORITES = 'Get_ALL_FAVORITES'
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const EDIT_THE_PRODUCT = "EDIT_THE_PRODUCT"


var localhost = "http://localhost:3000" 

export function getAllProducts() {

 

  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3000/api/products");
      return dispatch({
        type: "GET_PRODUCTS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e)
    }
  }
}

export function searchProduct(search) {

  return async function (dispatch) {
    try {
      let busqueda = await axios.get("http://localhost:3000/api/products/name/" + search)
      return dispatch({
        type: SEARCH_PRODUCTS,
        payload: busqueda.data
      })
    } catch (error) {
      console.log(error)
    }
  }

}

export function detailProduct(id) {
  return async function (dispatch) {
    try {
      let detail = await axios.get("http://localhost:3000/api/products/id/" + id)
      return dispatch({
        type: GET_DETAILS,
        payload: detail.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function addCart(product) {
  //console.log(product)
  return function (dispatch) {
    try {
      return dispatch({
        type: ADD_CART,
        payload: product,
      })
    } catch (e) { console.log(e) }
  }
}

export function clearCart() {
  return function (dispatch) {
    try {
      return dispatch({
        type: CLEAR_CART,
      })
    } catch (e) { console.log(e) }
  }
}

export function deleteOneItemFromCart(id) {
  return function (dispatch) {
    try {
      return dispatch({
        type: DELETE_ONE_ITEM_FROM_CART,
        payload: id,

      })

    } catch (e) { console.log(e) }
  }
}
export function deleteAllSingleItemFromCart(id) {
  return function dispatch(dispatch) {
    try {
      return dispatch({
        type: DELETE_ALL_SINGLE_ITEM_FROM_CART,
        payload: id,
      })
    } catch (e) { console.log(e) }
  }
}

export function addToFavorites(id) {
  return function (dispatch) {
    try {
      return dispatch({
        type: ADD_TO_FAVORITES,
        payload: id,
      })
    } catch (e) { console.log(e) }
  }
}

export function deleteFromFavorites(id) {
  return function (dispatch) {
    try {
      return dispatch({
        type: DELETE_FROM_FAVORITES,
        payload: id,
      })
    } catch (e) { console.log(e) }
  }
}

export function getMyFavorites() {
  return function (dispatch) {
    try {
      return dispatch({
        type: Get_ALL_FAVORITES
      })
    } catch (e) { console.log(e) }
  }
}

export function userGmail(user) {
  return function (dispatch) {
    try {
      return dispatch({
        type: SET_USER,
        payolad: user,
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function cleanDetail() {
  try {
    return {
      type: CLEAN_DETAIL
    }
  } catch (e) { console.log(e) }   
  
}

export function editTheProduct(product){
  try{
    return async function (){
        await axios.put(`${localhost}/api/products/update/${product._id}`, product)
    }
  }catch(e) { console.log(e) }
}