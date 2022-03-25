import React, { useEffect, useState } from "react"
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import  {Link, useNavigate}  from 'react-router-dom'
///////////////// material ui ///////////////////////////////////

const useStyles = makeStyles(theme => ({
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


export default function LogIn() {
	const navigate = useNavigate();
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
	const classes = useStyles()

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
            url: "http://localhost:3000/api/auth/googlelogin",
            data: {
              tokenId: response.tokenId
            }
          }).then(response => { window.localStorage.setItem("token", response.data.token);
		  window.location.reload(false);
		  navigate("/") })
		}
		  //  console.log("Google login success", response); 
		  /*{
                                                              googleToken,
                                                              user: {_id, name, email}
                                                              } */
           
	
    
		
      
	const responseErrorGoogle = (response) => {
		console.log(response)
		}
	
		const handleRegister = async (event) => {
			const  ExpRegEmail =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
		 if(!name || !email || !password){
			 return alert('por favor llene todos los campos')
		 } if(email.match(ExpRegEmail)==null){
			 return alert('por favor ingrese un email valido')
		 }
			  try {
				axios({
					method: 'POST',
					url: "http://localhost:3000/api/auth/signin",
					data: {
					  name: name,
					  email: email,
					  password: password,
					}
				  }).then(response =>{
					console.log("Google login success", response) /*{
																	  googleToken,
																	  user: {_id, name, email} */
						  window.location.reload(false);
						   navigate("/login")

				  }).catch(err=>{
					  console.log("ojala no salgas xd", err)
				  })  // en caso de que el logueo sea exitoso
			  }      
			catch(e) { 
				console.log("HandleRegister", e)
			}
		}/*
const  Loginbutton = () => {
return (
	<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
				<div className={classes.div}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>Sign In</Typography>
					<form className={classes.form}>
						<TextField
							fullWidth
							autoFocus
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
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Password'
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
							onChange={(e)=> {setName(e.target.value)}}
						/>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							className={classes.button}
							onClick={() => onSubmit()}
						>
							Sign In
						</Button>
					</form>
				</div>
			</Container>
		</Grid>
)

}  */


return (
	<React.StrictMode>
  <GoogleLogin
                    clientId="915932541790-lpaqrr1iij1onmgvn6k9jkkng1igjvdd.apps.googleusercontent.com"
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
			  <Typography component='h1' variant='h5'>Sign In</Typography>
			  <form className={classes.form}>
				  <TextField
					  fullWidth
					  type='password'
					  color='primary'
					  margin='normal'
					  variant='outlined'
					  label='Password'
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
					  Sign In
				  </Button>
			  </form>
		  </div>
	  </Container>
</Grid>   
  </React.StrictMode>
		
) 


}