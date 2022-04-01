import { useSelector } from "react-redux"
import Card from "./Card"
import Grid from '@material-ui/core/Grid';
import { Avatar, Button, Typography } from "@mui/material";
import { Login, Home, ShoppingCart, Search, Rowing } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    burguerButton: {
        backgroundColor: 'blue',
        color: 'white'
    },
}));

export default function ResultSearch() {
    const { resultSearch, haveResult } = useSelector(state => state)
    const useStyles = makeStyles({
    });
    const classes = useStyles()


    return (<div>
        <Grid container spacing={2}>
            {
                (resultSearch.length !== 0) ?
                    resultSearch.map((e, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3}
                            key={index}
                        >
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
                    : ((!haveResult) ? <div> Loading </div> : <></>)
            }</Grid>


        {(haveResult) ? <div>
            <img src="https://cdn-icons-png.flaticon.com/512/6134/6134116.png" alt="img" width={300} style={{ marginTop: 50 }} />
            <h2>No hemos encontrado un producto </h2>

        </div> : <></>}
        <Link to="/" style={{ textDecoration: "none" }}
            onClick={() => dispatch(cleanDetail())}
        >
            <Button
                color="navBtnColor"
                variant="contained"
                endIcon={<Home />}
                style={{ backgroundColor: 'blue' }}
                className={classes.burguerButton}
            >
                Volver
            </Button>
        </Link>
    </div>)
}