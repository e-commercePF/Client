import { useState } from 'react'
import { Button } from "@mui/material";
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { updateOrder } from '../Redux/actions';

export default function InputOrders({send, id}){
 
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const [theStatus, setTheStatus] = useState('pending')
    const [error, setError] = useState('')

    const handleStatus = (e)=> {
        setTheStatus(e)
    }

    const handleSubmitEvent = ()=> {

    let orderStatus = {
        "status" : theStatus
    }
    let token = window.localStorage.getItem('token');
    let config = { headers: {
            Authorization: 'Bearer ' + token}}

         Swal.fire({
            title: '¿Estas seguro que deseas cambiar el status del pedido?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, modificar!'
          }).then((result) => {
            if (result.isConfirmed) {
               dispatch(updateOrder(id, orderStatus, config))
               .then(x => {
                   console.log(x)
                   if(x._id){
                    Swal.fire(
                        'La base de datos se ha actualizado'
                      )        
                   }else {
                       Swal.fire(
                            x
                         )      
                   }
               //}).then(x=> {
                //   window.location.reload()
               }).catch(e=> {
                   return e 
               })                                 
            }
        //    setTimeout(()=> {
        //     window.location.reload()
        //    }, 2000) 
          })
    }


    return (
        <div> 
            {  edit ? <div style={{marginBottom: '1rem'}}>            
                <select onChange={e=> handleStatus(e.target.value)}>
                    <option > Selecciona el status del pedido </option>
                    <option value= 'pending'> Pendiente </option>   
                    <option value='dispatched'> Despachada </option>
                    <option value='completed'> Completada </option>    
                    <option value='canceled'> Cancelada </option>    
            </select>             
         <Button variant='contained' color='secondary' style={{marginBottom: '1rem'}} onClick={()=> handleSubmitEvent()}>  Guardar Cambios </Button>
          </div>  
          :  <div style={{marginBottom: '1rem'}}>
                <span> Status del envio <b> { send } </b> </span>
                <Button variant='contained' color='secondary'  style={{marginBottom: '1rem', marginTop: '0.5rem'}} onClick={()=>  setEdit(!edit)}> Cambiar status del pedido </Button>    
           </div>            
            }
        </div>
    )
}