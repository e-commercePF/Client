import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Link, useNavigate} from "react-router-dom"
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import axios from 'axios'


const useStyles = makeStyles({
    btn1: {
        marginLeft: '-80%',
        margin: '1rem'
    },
    container: {
        display: 'grid'
    }
})


export default function ControlPanel() {
    const clases = useStyles()     
    const navigate = useNavigate()


    useEffect(() =>{
        let token = window.localStorage.getItem('token');
        let config = { headers: {
                Authorization: 'Bearer ' + token}}
          axios.get('http://localhost:3000/api/users/admin/verify', config)
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
               return navigate('/')
            })
           },[navigate])

    return <div className={clases.container}>
        <h1>Bienvenido Administrador</h1>
      
        <Grid container spacing={1} style={{ minWidth: "1200px" }}>
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Lista de Stock Disponible
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Edita tu stock
                    </Typography>
                    <Typography variant="body2">
                        Si requieres mirar tu stock
                        <br />
                        haga click acá.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/stock" style={{ textDecoration: "none", }}><Button variant="contained" color="primary" className={clases.btn1}> Stock </Button></Link>
                </CardActions>
            </Card>

            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Lista de Usuarios
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Edita tu lista de usuarios y roles
                    </Typography>
                    <Typography variant="body2">
                        Si requieres eliminar o actualizar
                        <br />
                        un usuario,  haga click acá.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/users" style={{ textDecoration: "none", }}><Button variant="contained" color="primary" className={clases.btn1}>Ver y editar usuarios </Button></Link>
                </CardActions>
            </Card>

            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Crear un producto nuevo
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Agrega un producto a tu página
                    </Typography>
                    <Typography variant="body2">
                        Si requieres agregar un producto a
                        <br />
                        tu página, haga click acá.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/createproduct" style={{ textDecoration: "none", }}><Button variant="contained" color="primary" className={clases.btn1}> Cargar articulo Nuevo </Button></Link>
                </CardActions>
            </Card>

            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Ver tus Ordenes de venta
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Ve y edita tus ordenes de venta
                    </Typography>
                    <Typography variant="body2">
                        Si requieres editar o cambiar estado
                        <br />
                        a una orden de venta, haga click acá
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/admin/orders" style={{ textDecoration: "none", }}><Button variant="contained" color="primary" className={clases.btn1}> Ordenes de Venta </Button></Link>
                </CardActions>
            </Card>


        </Grid>
    </div>
}