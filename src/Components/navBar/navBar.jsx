import { Button, Input } from "@material-ui/core"
import "./navBar.css"
import { Login, Home, ShoppingCart, Search } from '@mui/icons-material';
import { useState } from "react";
import { useDispatch } from "react-redux"
import { searchProduct } from "../../Redux/actions";
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
    // console.log(isDisable)

    return (<div className="header">

        <div className="bnavbar">

            <Link to="/" style={{ textDecoration: "none" }}>

                <Button
                    color="secondary"
                    variant="contained"
                    endIcon={<Home />}>
                    Home
                </Button>

            </Link>

            <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                    color="secondary"
                    variant="contained"
                    endIcon={<Login />}>
                    Login
                </Button>

            </Link>

            <Button
                color="secondary"
                variant="contained"
                endIcon={<FavoriteBorderIcon />}
                onClick={(e) => navigate('./favorites')}
            >
                Mis favoritos
            </Button>

            <Button
                color="secondary"
                variant="contained"
                endIcon={<ShoppingCart />}
                onClick={(e) => isDisableChange(e)}
            >
                Carrito
            </Button>

            {isDisable === false ? <Carrito /> : null}

          

        </div>

        <header className="logostitulo">
            <img className="imagen1" src="https://www.freeiconspng.com/uploads/exercise-sport-icon--7.png" width="50" alt="Exercise, sport icon " />
            <h1>Sport Store </h1>
            <img className="imagen2" src="https://www.freeiconspng.com/uploads/sport-activities-tennis-icon-512x512-pixel-9.png" width="50" alt="Sport Activities Tennis icon 512x512 pixel" />
        </header >

        <div className="inputsearch">
            <Input
                placeholder="¿Qué estás buscando?"
                onChange={(event) => onHandleSearch(event)}
                value={search}
            ></Input>
            <Link to="/result" style={{ textDecoration: "none" }}>
                <Button
                    color="primary"
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
        </div>

    </div>)
}