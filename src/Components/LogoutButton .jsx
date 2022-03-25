import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, Typography } from "@mui/material";



export default function LogoutButton() {
  
const navigate = useNavigate()
const [user,setUser] = useState('');

          useEffect(()=>{
	    const loggedUserJSON = window.localStorage.getItem('token')
         setUser(loggedUserJSON)
        },[])

const LoginButton =() => { 
    return(
    <Link to="/login" style={{ textDecoration: "none" }}
    >
    <Button
        color="navBtnColor"
        variant="contained"
        endIcon={<Login />} >
     Login
    </Button> 
   </Link> 
    )
}

const handleLogout = e => {
    setUser(null)
    window.localStorage.removeItem('token')
    window.location.reload(false);
    navigate("/login")
}

const  Logout = () => {
   return ( 
    <Button
        color="navBtnColor"
        variant="contained"
        endIcon={<ExitToAppIcon />}
        onClick= { (e) => handleLogout()} >   
        Logout
    </Button> 
   )

}

const Regtrister = () => {
    return(
        <Link to='/CreateUser' style={{ textDecoration: "none" }}
        >
        <Button
            color="default"
            variant="contained"
            endIcon={<Login />} >
         Registrarse
        </Button> 
       </Link> 
    )
}
return(
<div>
{   user ? Logout()  : LoginButton() }

</div>
);
}