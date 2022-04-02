import React, { useEffect, useState } from "react"
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import  {Link, useNavigate}  from 'react-router-dom'
import { makeStyles } from  '@material-ui/core/styles'
import { Grid, Container, Paper, Avatar, TextField, CssBaseline } from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { Button , Typography} from "@mui/material";
import Swal from 'sweetalert2'
/////////////// material ui /////////////////
const useStyles =  makeStyles(theme => ({
	root: {
	
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh'
	},
	container: {
		opacity: '0.8',
		height: '60%',
		marginTop: theme.spacing(10),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		}
	},
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(3, 0, 2)
	}
}))  





 export default function CreateUser(){
    const navigate = useNavigate();
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const classes = useStyles()
	const {REACT_APP_BACKEND_URL,REACT_APP_GOOGLEKEY} = process.env 

      useEffect(()=>{
	    const loggedUserJSON = window.localStorage.getItem('token')
      if(loggedUserJSON ){
        navigate("/")
        }	
    },[navigate])

    const responseSuccessGoogle = response =>{
        console.log(response)
        axios({
            method: 'POST',
            url: `${REACT_APP_BACKEND_URL}/api/auth/googlelogin`,
            data: {
              tokenId: response.tokenId
            }
          }).then(response =>{
            console.log("Google login success", response); /*{
                                                              googleToken,
                                                              user: {_id, name, email}
                                                              } */
            window.localStorage.setItem("token", response.data.tokenId);			
			window.location.reload(false)
			navigate("/")
				window.location.reload();			
				  
          })
      }
    
    const responseErrorGoogle = response =>{
        console.log(response)
      }    
 const handleRegister = async (event) => {
		const  ExpRegEmail =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
		if( !email || !password || !name){
			return Swal.fire('Please fill all fields')
		} if(email.match(ExpRegEmail)==null){
			return Swal.fire('invalid email')
		}
        try {
            axios({
                method: 'POST',
                url: `${REACT_APP_BACKEND_URL}/api/auth/signup`,
                data: {
                  name: name,
                  email: email,
                  password: password,
                }
              }).then(response =>{
				//window.localStorage.setItem("token",  response.data.tokenId); /*{
                                                                //   googleToken,
                                                                //   user: {_id, name, email}
                                                                //   } */
		    window.location.reload(false)
                navigate("/login")
              }).catch(err=>{
                  return  Swal.fire("the email has already been registered", err)
              })
           
                
            // en caso de que el logueo sea exitoso
          
        
        }      
        catch(e) { 
            console.log("HandleRegister", e)
        }
    }
return(

	<React.StrictMode>
  <GoogleLogin
                    clientId={REACT_APP_GOOGLEKEY}
                    buttonText="Signup with Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                />
     
	  <Grid container component='main' className={classes.root}>
	  <CssBaseline />
	  <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
		  <div className={classes.div}>
			  <Avatar className={classes.avatar}>
				  <LockOutlinedIcon />
			  </Avatar>
			  <Typography component='h1' variant='h5'>registrarse</Typography>
			  <form className={classes.form}>
				  <TextField
					  fullWidth
					  type='text'
					  color='primary'
					  margin='normal'
					  variant='outlined'
					  label='name'
					  name='name'
					  value={name}
					onChange={(e)=> {setName(e.target.value)}}
				  />
						  <TextField
					  fullWidth
					  autoFocus
					  type ='password'
					  color='primary'
					  margin='normal'
					  variant='outlined'
					  label='password'
					  name='password'
					  value={password}
					  onChange={(e)=> {setPassword(e.target.value)}}
				  />
                  		  <TextField
					  fullWidth
					  autoFocus
					  color='primary'
					  margin='normal'
					  variant='outlined'
					  label='email'
					  name='email'
					  value={email}
					  onChange={(e)=> {setEmail(e.target.value)}}
				  />
				  <Button
					  fullWidth
					  variant='contained'
					  color='secondary'
					  className={classes.button}
					  onClick={() => handleRegister()}
				  >
					  registrarse
				  </Button>
			  </form>
		  </div>
	  </Container>
</Grid>   
  </React.StrictMode>

    
);
}