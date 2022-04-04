import { useState } from "react"
import { Button, Paper } from "@mui/material"
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux"
import { resetPasswordByAdmin } from "../Redux/actions"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'rgb(213, 217, 222)',
    boxShadow: '0 5px 5px rgb(0,0,0,0.1)', 
    borderRadius: '10px',
    border: 'solid 1px black' 
  }, 
  btn: {
    display: 'flex', 
    //gridTemplateRows: 'repeat(1, 1fr)'
   
  }, 
  btn1: {
    padding: '1.5rem'
  }
})

export default function InputUsers({id, name, role, email, handleChangeRole, handleEditUser, deleteUser}){

  const clases = useStyles()

    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const handleEditProduct = ()=> {
        setEdit(!edit)
    }
    let token = window.localStorage.getItem('token')
    let config = { headers: {
            Authorization: 'Bearer ' + token}}
    let objeto = {
        _id: id
    }

    const handleResetPassword = ()=> {
        Swal.fire({
            title: `¡Estas a punto de Resetear el Password de ${name}!`,
            text: "Esta acción es irremediable y modificará la base de datos, ¿estas seguro que deseas continuar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, resetear!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(resetPasswordByAdmin(objeto, config))
              Swal.fire(
                `${name} ha recibido un email para modificar su contraseña`,
                'La base de datos se ha actualizado.',
                'success'
              )                            
            }
        //    setTimeout(()=> {
        //     window.location.reload()
        //    }, 3000) 
          })        
    }



    return (
        <Paper className={clases.paper}> 
            <span> ID: { id } </span>
            <span>Nombre: { name }</span>

            {edit ? <span> Rol:   <select onChange={(e)=> handleChangeRole(e.target.value)}>
                            <option> Selecciona el nuevo rol del usuario </option>
                            <option value="admin"> administrador </option>
                            <option value="client"> cliente </option>
                        </select> </span> :  <span> Rol: <b>{ role } </b></span>} 

            <span> email: { email }</span>       

            <div className={clases.btn} style={{display: 'grid', gridTemplateColumns: 'repeate(1, 1fr)', marginLeft: '3rem'}}>

            {edit ? 
                    <Button variant="contained" color="primary" className={clases.btn1}style={{maxWidth: '30%', padding: '0.5em'}} onClick={(x)=> handleEditUser(x)} > Actualizar Usuario </Button>     
                   : <Button variant="contained" color="secondary"style={{maxWidth: '30%'}} onClick={handleEditProduct}> Actualizar Usuario </Button>
            }
            
            <Button variant="contained" className={clases.btn1} color='error' style={{ maxWidth: '30%'}} onClick={()=> handleResetPassword()}>Resetear Password </Button>        
            
            <Button variant="contained" color="error" className={clases.btn1} onClick={()=> deleteUser()}style={{maxWidth: '30%'}} > Eliminar Usuario </Button>
            </div>

        </Paper>
    )
}