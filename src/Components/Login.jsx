import { useEffect, useState } from "react"
import axios from "axios"
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import  {useNavigate}  from 'react-router-dom'
import {auth, provider} from '../firebase'
import { useDispatch,  useSelector } from "react-redux"
import { userGmail } from "../Redux/actions"



export default function Login() {
const dispatch = useDispatch()
const	navigate = useNavigate()
	 
    const [user,setUser] = useState(null);
	const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    useEffect(()=>{
	    const loggedUserJSON = window.localStorage.getItem('token')
        if(loggedUserJSON ){
        const userLog = JSON.parse(loggedUserJSON)
        setUser(userLog)
        console.log(userLog)
        }
	
    },[])

    const login = async (user) => {
        const { data } = await axios.post('http://localhost:3000/api/user/signin', user)
        
        return data
    }

    
    

    const handleLogin = async (event) => {
        console.log(user)
        try {
			const user = await login({username, password}) 
           setUser(user)
            window.localStorage.setItem('token', JSON.stringify(user))
            // en caso de que el logueo sea exitoso
			navigate("/")
		}
            
        catch(e) { console.log(e)
		}
    }

    const handleLogout = e => {
        setUser(null)
        window.localStorage.removeItem('token')
		
    }

	///////////// material ui ////////////////////////////

//////////estylosss///////////////////////

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


////////////////////////////////////////////////

		
		const classes = useStyles()
	//////////////////////////////login gmail//////////

	const signin = () =>{
     //auth.signInWithPopup(provider).then(result=> console.log(result)).catch()
	 //auth().signInWithPopup(provider).then(result => dispatch(userGmail(result.user))).catch()
	 auth().signInWithPopup(provider).then(result => dispatch(userGmail(result.user)) ).catch()
	 setTimeout(function(){
	navigate("/")
	}, 10000);
	}

	 const user2 = useSelector((state) => state.user2)

		

     return (<div>
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
							label='username'
							name='username'
							value={username}
							onChange={(e)=> {setUsername(e.target.value)}}
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
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							className={classes.button}
							onClick={() => handleLogin()}
						>
							Sign In
						</Button>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							className={classes.button}
							onClick={() => signin()}
						>
							Sign whit gmail
						</Button>
					</form>
				
				</div>
			</Container>
		</Grid>
	)

    </div>)
	}
