import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../Redux/actions';
import axios from "axios"
import Grid from '@mui/material/Grid';
import Card from "./Card"

export default function Paginado() {
    const { product } = useSelector(state => state)
    const [page, setPage] = useState(1)
    const getProductsPagination = async () => {
        let productToShow = await axios.get(`http://localhost:3000/api/products/forPage?page=${page}`)
        setProduct(productToShow.data.totalProducts)
        console.log(111111, productToShow.data.totalProducts)
    }

    const [productShow, setProduct] = useState([])
    const dispatch = useDispatch()

    let productOnStock = new Array
    productShow.forEach(x => {
        if (x.quantity !== 0) {
            productOnStock.push(x)
        }
    })

    useEffect(() => {
        dispatch(getAllProducts())
        getProductsPagination()
        console.log(2222, productShow)
        console.log(33333, page)
    }, [page])


    return (
        <Stack >
            <Pagination style={{ alignSelf: "center", marginBottom: "20px" }}
                count={(Math.ceil(product.length / 3))}
                page={page}
                onChange={(event, value) => setPage(value)}
                size="large"
            />
            {
                <Grid container spacing={2} style={{ alignSelf: "center" }}>
                    {
                        (productOnStock.length !== 0) ?
                            productOnStock.map((e, index) => (
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
            }
            <Pagination style={{ alignSelf: "center", marginTop: "10px" }}
                count={(Math.ceil(product.length / 3))}
                page={page}
                onChange={(event, value) => setPage(value)}
                size="large"
            />

        </Stack>
    );
}