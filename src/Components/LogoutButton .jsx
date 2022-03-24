import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import { Button } from "@material-ui/core"
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
        color="default"
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
    navigate("/login")
}

const  Logout = () => {
   return ( 
    <Button
        color="default"
        variant="contained"
        endIcon={<Login />}
        onClick= { (e) => handleLogout()} >   
        Logout
    </Button> 
   )


}
return(
<div>
{   user ? Logout()  : LoginButton()  }

</div>
);
}