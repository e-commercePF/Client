import { useState } from "react"
import { Button, Typography } from "@mui/material";

export default function InputUsers({id, name, role, email, handleChangeRole, handleEditUser}){

    const [edit, setEdit] = useState(false)
    const handleEditProduct = ()=> {
        setEdit(!edit)
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

        </div>
    )
}