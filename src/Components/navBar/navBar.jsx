import { Input, AppBar, Toolbar } from "@material-ui/core"
import { Avatar, Button, Typography } from "@mui/material";
import "./navBar.css"
import { Login, Home, ShoppingCart, Search, Rowing } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct, cleanDetail, isAdmin } from "../../Redux/actions";
import { Link, useNavigate } from 'react-router-dom';
import Carrito from "../Carrito";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutButton from "../LogoutButton "
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import  Menu from  '../Menu'
import { useTheme,  } from "@material-ui/core/styles";
import { useMediaQuery, SwipeableDrawer, Divider,   } from "@mui/material";
import { Hidden, IconButton } from "@mui/material";
import { ChevronRight } from "@material-ui/icons";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import axios from 'axios'
import ControlPanel from '../../Components/ControlPanel';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
const {REACT_APP_BACKEND_URL} = process.env 



const useStyles = makeStyles((theme) => ({
    burguerButton: {    
       backgroundColor: 'blue', 
       color: 'white'
    },
}));

export default function NavBar() {
const theme = useTheme()

const isMatch = useMediaQuery(theme.breakpoints.down('xs'))

    const navigate = useNavigate()
    const [search, setSearch] = useState()
    const [user, setUser] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('token')
        setUser(loggedUserJSON)
    }, [])

    const token = localStorage.getItem('token')
   
    let config = { headers: {
        Authorization: 'Bearer ' + token
    }}

    const [response, setResponse] = useState(false)

    if(token){
        var isTheAdmin = axios(`${REACT_APP_BACKEND_URL}/api/users/admin/verify`, config)
        .then( boolean => {           
           setResponse(boolean.data)           
        }) 
    } else isTheAdmin = false
   

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

    const [open, setOpen] = useState(false)

    return (<div className="header">


        <AppBar style={
            {
                position:"sticky",
                // position: "fixed",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                backgroundColor: "black"
            }
        }>

            <Typography variant="h4" component="div" sx={{ m: 2 }} >
                <img className="imagen1" src="https://www.freeiconspng.com/uploads/exercise-sport-icon--7.png" width="50" alt="Exercise, sport icon " />
                SportsMarket
            </Typography>
            
            <Hidden xsDown>

             { 
                !isMatch ?  
           
            <Toolbar> 
                {
                    response ? 
                    <Link to="/admin" style={{ textDecoration: "none" }}  >                   
              
                    <Button
                        color="navBtnColor"
                        variant="contained"
                        >
                        Panel de control
                    </Button>
                </Link>  : null
                }              
                

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

                {
                    !response && token ? 
                    <Link to={`/${token}`} style={{ textDecoration: "none" }}  >                   
              
                    <Button
                        color="navBtnColor"
                        variant="contained"
                        endIcon={ <InsertEmoticonIcon />}
                        >
                        Perfil
                    </Button>
                </Link>  : null
                }

              
                {

                    user ? null :

                        <Link to='/CreateUser' style={{ textDecoration: "none" }}
                        >
                            <Button
                                color="navBtnColor"
                                variant="contained"
                                endIcon={<Login />} >
                                Registrarse
                            </Button>
                        </Link>

                }
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
            
            </Toolbar> :    
            <React.Fragment> 
              { /* iNICIO DE LA HAMBURGUESA */}      
               <DensitySmallIcon  onClick={()=> setOpen(!open)}             
               />       
                    
                <SwipeableDrawer anchor="right" open={open} onClick={()=> setOpen(!open)} >
                    <div>
                        <IconButton>
                            <ChevronRight />
                        </IconButton>
                    </div>    
                        <Divider style={{backgroundColor: 'black'}} />
                        Sports Market

                        {/* REPETIR CODIGO QUE SE DESEA RENDERIZAR EN EL MENU DE HAMBURGUESA  */}

                        <Link to="/" style={{ textDecoration: "none" }}
                    onClick={() => dispatch(cleanDetail())}
                >
                    <Button
                        color="navBtnColor"
                        variant="contained"
                        endIcon={<Home />}
                        style={{backgroundColor: 'blue'}}
                        className={classes.burguerButton}
                        >
                        Home
                    </Button>
                </Link>

                {
                    !response && token ? 
                    <Link to={`/${token}`} style={{ textDecoration: "none" }}  >                   
              
                    <Button
                        color="navBtnColor"
                        variant="contained"
                        endIcon={ <InsertEmoticonIcon />}
                        style={{backgroundColor: 'blue'}}
                        >
                        Perfil
                    </Button>
                </Link>  : null
                }

                <Button
                 style={{backgroundColor: 'blue', maxWidth: '80%'}} >
                
                <LogoutButton />                           
                
                </Button> 
                {

                    user ? null :

                        <Link to='/CreateUser' style={{ textDecoration: "none" }}
                        >
                            <Button
                                color="navBtnColor"
                                variant="contained"
                                endIcon={<Login />}
                                style={{backgroundColor: 'blue'}}
                               
                                >
                                Registrarse
                            </Button>
                        </Link>
                }
                <Button
                    color="navBtnColor"
                    variant="contained"
                    endIcon={<FavoriteBorderIcon />}
                    onClick={(e) => navigate('./favorites')}
                    style={{backgroundColor: 'blue'}}
                >
                    Mis favoritos
                </Button>

                <Button
                    color="navBtnColor"
                    variant="contained"
                    endIcon={<ShoppingCart />}
                    onClick={(e) => navigate('./carrito')}
                    style={{backgroundColor: 'blue'}}
                >
                    Carrito
                </Button>
                { /* FIN DE LA HAMBURGUESA */}

                </SwipeableDrawer>    

            </React.Fragment>
}
            </Hidden>
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
    </div>)
}