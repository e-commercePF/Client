import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/actions";
import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Paginado from "./Paginado";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 100,
    },

}));


export default function Home() {

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getAllProducts())
    // }, [])



    // const { product } = useSelector(state => state)

    const classes = useStyles();

    // let productToShow = new Array
    // product.forEach(x => {
    //     if (x.quantity !== 0) {
    //         productToShow.push(x)
    //     }
    // })


    return (
        <div className={classes.root}>

        <Menu/>
        <Grid container spacing={2}> 
                {
                    (product.length !== 0) ?
                    productToShow.map((e, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3}
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

            <Paginado />


        </div>
    )
}
