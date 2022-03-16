import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions";
import { useEffect } from "react";
import Card from Card;
const Home = () => {

const dispatch = useDispatch();
useEffect(() =>{
    dispatch(getAllProducts())
    },[])

    const allproducts = useSelector((state) => state.initialState)





    return (
<div>

{
    
    allproducts && 
    allproducts.map(e => (

   <Card 
   id = {e._id}
   sku = {e.sku} 
   name = {e.name}
   description = {e.description}
   price = {e.price}
   quantity = {e.quantity}
   isOnStock = {e.isOnStock}
   img = {e.img}
   category = {e.category}
   __v = {e.__v} />
))
}
</div>
)
}
