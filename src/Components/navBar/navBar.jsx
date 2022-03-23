import { Button, Input, AppBar, Toolbar } from "@material-ui/core"
import "./navBar.css"
import { Login, Home, ShoppingCart, Search, Rowing } from '@mui/icons-material';
import { useState } from "react";
import { useDispatch } from "react-redux"
import { searchProduct, cleanDetail } from "../../Redux/actions";
import { Link, useNavigate } from 'react-router-dom';
import Carrito from "../Carrito";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function NavBar() {
    const navigate = useNavigate()
    const [search, setSearch] = useState()
    const dispatch = useDispatch()

    function onHandleSearch(event) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    const [isDisable, setIsDisable] = useState(true)
    const isDisableChange = (e) => {
        e.preventDefault()
        setIsDisable(!isDisable)

    }

    return (<div className="header">


        <AppBar style={
            {
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                backgroundColor: "black"
            }
        }>

            <h1>
                <img className="imagen1" src="https://www.freeiconspng.com/uploads/exercise-sport-icon--7.png" width="50" alt="Exercise, sport icon " />
                SportsMarket
            </h1>

            <Toolbar>


                <Link to="/" style={{ textDecoration: "none" }}
                    onClick={() => dispatch(cleanDetail())}
                >
                    <Button
                        color="default"
                        variant="contained"
                        endIcon={<Home />}>
                        Home
                    </Button>
                </Link>

                {/* <Link to="/login" style={{ textDecoration: "none" }}
                >
                <Button
                    color="default"
                    variant="contained"
                    endIcon={<Login />}>
                    Login
                </Button> */}

                {/* </Link> */}

                <Button
                    color="default"
                    variant="contained"
                    endIcon={<FavoriteBorderIcon />}
                    onClick={(e) => navigate('./favorites')}
                >
                    Mis favoritos
                </Button>

                <Button
                    color="default"
                    variant="contained"
                    endIcon={<ShoppingCart />}
                    onClick={(e) => navigate('./carrito')}
                >
                    Carrito
                </Button>

                {isDisable === false ? <Carrito /> : null}

            </Toolbar>

            <div className="inputsearch">
                <form>
                    <Input
                        style={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            height: "2.2em"
                        }}
                        placeholder="¿Qué estás buscando?"
                        onChange={(event) => onHandleSearch(event)}
                        value={search}
                    ></Input>
                    <Link to="/result" style={{ textDecoration: "none" }}
                    >

                        <Button
                            type="submit"
                            color="default"
                            variant="contained"
                            startIcon={<Search />}

                            onClick={() => {
                                if (!search) {
                                    alert("Debes ingresar tu búsqueda")
                                } else {
                                    dispatch(searchProduct(search))
                                    setSearch("")
                                }
                            }}

                        >
                            Buscar
                        </Button>
                    </Link>
                </form>
            </div>
        </AppBar>
        <div className="offset"></div>
    </div>)
}