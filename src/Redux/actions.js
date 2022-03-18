import axios from 'axios';
export const GET_PRODUCTS = "GET_PRODUCTS"
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"
export const GET_DETAILS = "GET_DETAILS"
export const ADD_CART = "ADD_CART"


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

export function addCart(product){
  console.log(product)
  return function (dispatch){
  try{
    return dispatch({
      type: ADD_CART,
      payload: product, 
      })
    } catch(e) {console.log(e)}
  }
}