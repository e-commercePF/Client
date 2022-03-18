import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/actions";
import { useEffect } from "react";
import Card from "./Card"


export default function Home() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])


    const { product, haveResult } = useSelector(state => state)
    console.log(111, product)



    return (
        <div>

            {

                (product.length !== 0) ?
                    product.map((e, index) => (
                        <div
                            key={index}>
                            <Card
                                rating={e.rating}
                                id={e._id}
                                sku={e.sku}
                                name={e.name}
                                description={e.description}
                                price={e.price}
                                quantity={e.quantity}
                                isOnStock={e.isOnStock}
                                img={e.img}
                                category={e.category}
                                __v={e.__v} />

                        </div>
                    ))
                    : <h1> Loading</h1>
            }

            {(haveResult) ? <div>
                <img src="https://cdn-icons-png.flaticon.com/512/6134/6134116.png" alt="img" />
                <h2>No hemos encontrado un producto </h2>

            </div> : <></>}
        </div>
    )
}
