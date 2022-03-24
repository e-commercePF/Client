import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/actions";
import { useEffect } from "react";
import Card from "./Card"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 100,
    },
    
  }));


export default function Home() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])


    
    const { product, haveResult } = useSelector(state => state)



    const classes = useStyles();


    return (
        <div className={classes.root}>
        <div ></div>
        <Grid container spacing={2}> 
                {
                    (product.length !== 0) ?
                        product.map((e, index) => (
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

                            </Grid>
                        ))
                        : <h1> Loading</h1>
                }
            </Grid>
        </div>
    )
}
