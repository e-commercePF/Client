import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllOrders } from "../Redux/actions"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@mui/styles';
import { Button } from "@mui/material";
import InputOrders from './InputOrders';

const {REACT_APP_BACKEND_URL} = process.env 

const useStyles = makeStyles({
    card: {
        margin: '1.5rem',
        backgroundColor: 'rgb(213, 217, 222)',
    }, 
    button: {
        backgroundColor: 'rgb(180, 250, 130)'
    }
})


export default function Orders() {

    const clases = useStyles()    

    const navigate = useNavigate()
    let token = window.localStorage.getItem('token');
    let config = { headers: {
            Authorization: 'Bearer ' + token}}

    useEffect(() =>{
        let token = window.localStorage.getItem('token');
        let config = { headers: {
                Authorization: 'Bearer ' + token}}
         axios.get(`${REACT_APP_BACKEND_URL}/api/users/admin/verify`, config)
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
                navigate('/')
            })
           }   ,[navigate])

    const dispatch = useDispatch()
        useEffect(() => {
           dispatch(getAllOrders(config))
       }, [])

    const [allOrders, setAllOrders] = useState([])
    
    const { orders } = useSelector(state=> state)

if(typeof orders === 'object' && typeof orders.then === 'function'){
     orders.then(x=> {
        setAllOrders(x.data)
    })
}
    
    let contador = 1

    const statusOrders = allOrders.map(x=> x.status)

    let orderStatusToShow = statusOrders.reduce((a, e) =>{ //ELIMINAR DUPLICADOS
        if(!a.find(d=> d===e)) a.push(e)
        return a
       }, [])
    
    const [activeOrder, setActiveOrder] = useState('')
       console.log(activeOrder)
    let orderInList
       activeOrder === 'all' || activeOrder === '' ? orderInList = allOrders :
        orderInList = allOrders.filter(x=> x.status === activeOrder)

        console.log(orderInList)

    return (<>

        <h1> Estas son tus ordenes de venta </h1> 
        <select onChange={e=> setActiveOrder(e.target.value)}> 
            <option value='all'> Selecciona el status que deseas filtrar </option>
            {
                orderStatusToShow.map(x=> <option value={x}> {x} </option> )
               
            }
        </select>    
        {            
            orderInList.map(x=> {
                return <div>
                    <Paper elevation={3} className={clases.card}>                        
                    <span><b> Venta Número:   {contador ++ } </b> </span>
                    <span>UserId: {x.userId} </span> 
                    <span>Fecha de compra: <b>{x.createdAt.slice(0, 10)}</b> </span>                    
                    {x.products.map(x=> {
                        return <div>
                            
                            <span> <b> Product Id:</b> {x.productId} </span>
                            <span> Price: <b>$ {x.price}</b> </span>
                            <span> <b> Cantidad: </b>{x.quantity} </span>
                        </div> 
                    })}
                   <span> Valor Total: <b> $ {x.amount}</b> </span>
                 
                            <h4> Dirección de envio </h4>
                           <span>Calle: {x.address.line1} </span>
                           <span>Ciudad: {x.address.city} </span>
                           <span>Pais:  {x.address.country} </span>
                           <span> C.P: {x.address.postal_code} </span>
                           <InputOrders
                              send={x.status}
                              id={x.orderId}   
                            />                    
                        </Paper>        
                </div>
            })
        }


    </>)
}