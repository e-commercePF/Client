import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from "react-router-dom"
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import axios from 'axios'


const useStyles = makeStyles({
    container: {
        display: 'grid'
    },
    card: {
        backgroundColor: 'rgb(173, 184, 175)',
        boxShadow: '0 5px 5px rgb(0,0,0,0.1)',
        borderRadius: '5px',
        border: 'solid 1px black'
    }
})


export default function ControlPanel() {
    const clases = useStyles()

    const navigate = useNavigate()
    useEffect(() => {
        let token = window.localStorage.getItem('token');
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        axios.get('http://localhost:3000/api/users/admin/verify', config)
            .then(res => {
                // console.log(res.data)
            }).catch(err => {
                console.log(err)
                return navigate('/')
            })
    }, [navigate])

    return <div className={clases.container}>
        <h1>Welcome Administrator</h1>

        <Grid container spacing={1} >
            <Card sx={{ width: 350 }} className={clases.card}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Available Stock List
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Edit your stock
                    </Typography>
                    <Typography variant="body2">
                        If you want to look your stock,
                        <br />
                        click here.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/stock" style={{ textDecoration: "none", }}><Button variant="contained" color="secondary" sx={{ marginLeft: '10em' }}> Stock </Button></Link>
                </CardActions>
            </Card>

            <Card sx={{ width: 350 }} className={clases.card}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Users list
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Edit your list of users and roles
                    </Typography>
                    <Typography variant="body2">
                        If you want delete or edit
                        <br />
                        an user, click here.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/users" style={{ textDecoration: "none", }}><Button variant="contained" color="secondary" sx={{ marginLeft: '5em' }}>See and edit users </Button></Link>
                </CardActions>
            </Card>

            <Card sx={{ width: 350 }} className={clases.card}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Upload a new product
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Add a new product to your page
                    </Typography>
                    <Typography variant="body2">
                        If you want add a new producto to
                        <br />
                        your page, click here.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/createproduct" style={{ textDecoration: "none", }}><Button variant="contained" color="secondary" sx={{ marginLeft: '4em' }}> Upload a new product </Button></Link>
                </CardActions>
            </Card>

            <Card sx={{ width: 350 }} className={clases.card}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        See your sales Orders
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        See and edit your Sales Orders
                    </Typography>
                    <Typography variant="body2">
                        If you want see or edit status
                        <br />
                        of a sale order, click here.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/orders" style={{ textDecoration: "none", }}><Button variant="contained" color="secondary" className={clases.btn1} sx={{ marginLeft: '5.5em' }}>See your sales orders</Button></Link>                </CardActions>
            </Card>

            <Card sx={{ width: 350 }} className={clases.card}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Categories
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Edit, delete or create categories for your stock
                    </Typography>
                    <Typography variant="body2">
                        If you want delete or update
                        <br />
                        categories, click here.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/categories" style={{ textDecoration: "none", }}><Button variant="contained" color="secondary" sx={{ marginLeft: '4em' }}>See and edit categories </Button></Link>
                </CardActions>
            </Card>
            <Card sx={{ width: 350 }} className={clases.card}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Newsletter
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Create your Newsletters
                        <br />
                    </Typography>
                    <Typography variant="body2">
                        To create your newsletters
                        <br />
                        and send them, click here.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/Newsletter" style={{ textDecoration: "none", }}><Button variant="contained" color="secondary" className={clases.btn1} sx={{ marginLeft: '5.5em' }}>  newsletters </Button></Link>
                </CardActions>
            </Card>

        </Grid>
    </div>
}