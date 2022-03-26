import { getAllUsers, updateUsers, deleteUsers } from "../Redux/actions"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

export default function Users(){

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    let { users } = useSelector(state => state)
    users = users.data
    users !== undefined ? users = users : users = []
   console.log(users)
    const [edit, setEdit] = useState(false)
    const handleEditProduct = ()=> {
        setEdit(!edit)
        console.log(edit)
    }
   
    const [role, setRole] = useState('')
    const handleChangeRole = (e)=> {      
        setRole(e) 
        console.log(role)       
    }

    const [user, setUser] = useState({
        createdAt: '',
        email: '',
        name: '',
        passwordHash: '',
        role: '',
        updatedAt: '',
        _id: ''

    })

    const handleEditUser = (x)=> {
        setUser( {
            createdAt: x.createdAt,
            email: x.email,
            name: x.name,
            passwordHash: x.passwordHash,
            role: role, 
            _id: x._id
        })

        if(user.name !== ''){
             let check = window.confirm(`Estas a punto de modificar el rol de un usuario, 
         ¿Estas seguro que deseas continual?`) 
         if(check){
             dispatch(updateUsers(user))
             alert('Se ha actualizado el rol del usuario')
             window.location.reload()
         }
        }  
    }

    const deleteUser = (e)=> {
        let check= window.confirm(`Estas a punto de eliminar permantemente a un usuario, 
            esta accion es irremediable, ¿Estas seguro que deseas continuar?`)
        
        if(check){
            dispatch(deleteUsers(e))
            alert('El usuario se ha eliminado con exito')
            window.location.reload()
        }        
    }

    return(
        <div> 
            Aqui puedes editar a los Usuarios 

            { users.map(x=> {
                return <div>
                    
                    <span>id:<b> {x._id} </b></span>
                    <span> name:<b> {x.name}</b></span>
                    {edit ? <span> Rol:   <select onChange={(e)=> handleChangeRole(e.target.value)}>
                            <option> Selecciona el nuevo rol del usuario </option>
                            <option value="admin"> administrador </option>
                            <option value="client"> cliente </option>
                        </select> </span> :  <span> Rol: <b>{x.role}</b></span>}                    
                    <span> email: <b>{x.email}</b></span>

                    {edit ? 
                    <Button variant="contained" color="primary" onClick={()=> handleEditUser(x)} > Actualizar Usuario </Button>     
                   : <Button variant="contained" color="secondary" onClick={handleEditProduct}> Actualizar Usuario </Button>
                }
                <Button variant="contained" color="error" onClick={()=> deleteUser(x._id)} > Eliminar Usuario </Button>
                    
                </div>
            })}

        </div>
    )
}
