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
            <Paginado />

        </div>
    )
}
