import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCart, detailProduct } from "../Redux/actions";
import { useState } from "react";
import Home from "./Home";


export default function Detail() {
    const { _id } = useParams()
    const { detailproduct } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailProduct(_id))
    }, [])

    let stock = detailproduct.quantity
    const myProduct = { _id: detailproduct._id, name: detailproduct.name, price: detailproduct.price, img: detailproduct.img, rating: detailproduct.rating }


    const handleAddCart = () => {
        //  e.preventDefault()       
        // let myProduct = { _id: detailProduct._id, piece: 1, name: detailProduct.name, price: detailProduct.price }
        dispatch(addCart(myProduct))
    }


    let pricetoshow = myProduct.price ? myProduct.price.toFixed(2) : null
    //console.log(pricetoshow)

    return (
        <div>
            {(detailproduct.name) ?
                <div>
                    <h1> {detailproduct.name} </h1>
                    <img src={detailproduct.img} alt="img" w_idth='500px' height='500px' /> <br />
                    <category> <b> Categoria: </b> {detailproduct.category} </category>
                    {/* <h4>Rating:
                    <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                </h4> */}
                    <span> <b> Descripción: </b>  {detailproduct.description} </span>
                    <h5> Precio: $ {pricetoshow} </h5>


                    <Button variant="contained" color="primary" onClick={() => handleAddCart()}>
                        Agregar al carrito
                    </Button>

                    <h5> Stock Actual: {stock} </h5>
                </div> : <div style={{ marginTop: 500 }} >Loading...</div>}



        </div>
    )
}