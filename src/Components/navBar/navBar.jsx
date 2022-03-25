import { Input, AppBar, Toolbar } from "@material-ui/core"
import { Button , Typography} from "@mui/material";
import "./navBar.css"
import { Login, Home, ShoppingCart, Search, Rowing } from '@mui/icons-material';
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux"
import { searchProduct, cleanDetail } from "../../Redux/actions";
import { Link, useNavigate } from 'react-router-dom';
import Carrito from "../Carrito";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutButton from "../LogoutButton "
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';

export default function NavBar() {
    const navigate = useNavigate()
    const [search, setSearch] = useState()
    const [user,setUser] = useState('');
    const dispatch = useDispatch()
    useEffect(()=>{
	    const loggedUserJSON = window.localStorage.getItem('token')
         setUser(loggedUserJSON)
        },[])
    function onHandleSearch(event) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    const [isDisable, setIsDisable] = useState(true)
    const isDisableChange = (e) => {
        e.preventDefault()
        setIsDisable(!isDisable)

    }

    const useStyles = makeStyles({
    });
    const classes = useStyles()

    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  
    return (<div className="header">


        <AppBar style={
            {
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                backgroundColor: "black"
            }
        }>

        <Typography variant="h4" component="div"  sx={{m:2}} >
            <img className="imagen1" src="https://www.freeiconspng.com/uploads/exercise-sport-icon--7.png" width="50" alt="Exercise, sport icon " />
            SportsMarket
         </Typography>

          
            <Toolbar>


                <Link to="/" style={{ textDecoration: "none" }}
                    onClick={() => dispatch(cleanDetail())}
                >
                    <Button
                        color="navBtnColor"
                        variant="contained"
                        endIcon={<Home />}>
                        Home
                    </Button>
                </Link>
                

                <LogoutButton/>
        {
        
        user ? console.log('consolelog') :

                <Link to='/CreateUser' style={{ textDecoration: "none" }}
        >
        <Button
            color="default"
            variant="contained"
            endIcon={<Login />} >
         Registrarse 
        </Button> 
       </Link> 
}
    {/*
             <Link to="/login" style={{ textDecoration: "none" }}
                >
                <Button
                    color="default"
                    variant="contained"
                    endIcon={<Login />}>
                    Login
                </Button> 

                 </Link> 
    */}
                <Button
                    color="navBtnColor"
                    variant="contained"
                    endIcon={<FavoriteBorderIcon />}
                    onClick={(e) => navigate('./favorites')}
                >
                    Mis favoritos
                </Button>

                <Button
                    color="navBtnColor"
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
                            height: "2.2em",
                            margin:"5px"
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
        {/* <div className={classes.offset}></div> */}
        <Offset/>
    </div>)
}