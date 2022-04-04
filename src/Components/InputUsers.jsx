import { useState } from "react"
import { Button, Typography } from "@mui/material"
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux"
import { resetPasswordByAdmin } from "../Redux/actions"

export default function InputUsers({id, name, role, email, handleChangeRole, handleEditUser}){
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
        <div> 
            <span> ID: { id } </span>
            <span>Nombre: { name }</span>

            {edit ? <span> Rol:   <select onChange={(e)=> handleChangeRole(e.target.value)}>
                            <option> Selecciona el nuevo rol del usuario </option>
                            <option value="admin"> administrador </option>
                            <option value="client"> cliente </option>
                        </select> </span> :  <span> Rol: <b>{ role } </b></span>} 

            <span> email: { email }</span>        

            {edit ? 
                    <Button variant="contained" color="primary" onClick={(x)=> handleEditUser(x)} > Actualizar Usuario </Button>     
                   : <Button variant="contained" color="secondary" onClick={handleEditProduct}> Actualizar Usuario </Button>
            }
            <Button variant="contained" color="error" onClick={()=> handleResetPassword()}>Resetear Password </Button>        

        </div>
    )
}