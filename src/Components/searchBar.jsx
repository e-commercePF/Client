import { Input, AppBar, Toolbar } from "@material-ui/core"
import { Avatar, Button, Typography } from "@mui/material";
import { Login, Home, ShoppingCart, Search, Rowing } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { getAllProducts, searchProduct } from "../Redux/actions";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";




const useStyles = makeStyles((theme) => ({
    burguerButton: {
        backgroundColor: 'blue',
        color: 'white'
    },
}));

export default function SearchBar() {
    const { product } = useSelector(state => state)
    const navigate = useNavigate()
    const [search, setSearch] = useState()
    const dispatch = useDispatch()

    const [productos, setProductos] = useState([])

    function onHandleSearch(event) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    useEffect(() => {
        dispatch(getAllProducts())
    })
    const getAllProductsForName = async () => {

        let allProductForSearch = await axios.get("http://localhost:3000/api/products")
        setProductos(allProductForSearch)
    }
    console.log(1111, productos)
    const useStyles = makeStyles({
    });

    return (<>
        <div className="inputsearch">
            <form>
                <Input
                    style={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        height: "2.2em",
                        margin: "5px"
                    }}
                    placeholder="¿Qué estás buscando?"
                    onChange={(event) => onHandleSearch(event)}
                    value={search}
                ></Input>
                <Link to="/result" style={{ textDecoration: "none" }}
                >

                    <Button
                        type="submit"
                        color="navBtnColor"
                        variant="contained"
                        startIcon={<Search />}

                        onClick={() => {
                            if (!search) {
                                alert("Debes ingresar tu búsqueda")
                            } else {
                                dispatch((searchProduct(search)))
                                setSearch("")
                            }
                        }}

                    >
                        Buscar
                    </Button>
                </Link>
            </form>
        </div>



    </>)
}