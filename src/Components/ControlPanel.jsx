import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/actions";
import Stock from "./Stock";
import { Button, Grid, Box } from "@mui/material";
import  CreatePage  from  './CreatePage'
import Users from "./Users";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    btn1: {
        marginLeft: '-80%',
        margin: '1rem'
    }, 
    container: {
        display: 'grid'
    }
})


export default function ControlPanel(){
    const clases = useStyles()

    const [stock, setStock] = useState(false)
    const handleShowStock = ()=> {
        setStock(!stock)
    }

    const [create, setCreate] = useState(false)
    const handleShowCreate = ()=> {
        setCreate(!create)
    }

    const [user, setUser] = useState(false)
    const handleShowUser = ()=> {
        setUser(!user)
    }

    return <div className={clases.container}>
                 <h1>Bienvenido Administrador</h1>
                 <Grid item xs={12}>
                   
                <div >
                     <Button variant="contained" color="primary" onClick={handleShowStock} className={clases.btn1}> Stock </Button>
                 </div>
                 {stock ? <Stock /> : null}
                 <div>
                     <Button variant="contained" color="primary" onClick={handleShowCreate} className={clases.btn1}> Cargar articulo Nuevo </Button>
                 </div>
                 {create ? <CreatePage /> : null}
                 <div>
                     <Button variant="contained" color="primary" onClick={handleShowUser} className={clases.btn1}> Ver y editar usuarios </Button>
                 </div>
                 {user ? <Users /> : null}
                    

                 </Grid>
                 
            


                   
                   
           </div>
}