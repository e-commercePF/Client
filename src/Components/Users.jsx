import { getAllUsers, updateUsers, deleteUsers } from "../Redux/actions"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import InputUsers from "./InputUsers";
import Swal from 'sweetalert2'

export default function Users(){

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    let { users } = useSelector(state => state)
    users = users.data
    users !== undefined ? users = users : users = []
   
    const [edit, setEdit] = useState(false)
    const handleEditProduct = ()=> {
        setEdit(!edit)
        console.log(edit)
    }
   
    const [role, setRole] = useState('')
    const handleChangeRole = (e)=> {      
        setRole(e) 
            
    }
  console.log(role) 


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
            role: role || x.role, 
            _id: x._id
        })

        if(user.name !== ''){
            Swal.fire({
                title: '¡Estas a punto de editar a un usuario!',
                text: "Esta acción es modificara la base de datos, ¿estas seguro que deseas continuar?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, modificar!'
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(updateUsers(user))
                  Swal.fire(
                    'Usuario modificado!',
                    'El usuario se ha modificado con exito.',
                    'success'
                  )                            
                }
               setTimeout(()=> {
                window.location.reload()
               }, 3000) 
              })
        }  
    }

    const deleteUser = (e)=> {
        Swal.fire({
            title: '¡Estas a punto de eliminar a un usuario!',
            text: "Esta acción es irremediable, ¿estas seguro que deseas continuar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteUsers(e))
              Swal.fire(
                '¡Eliminado!',
                'El usuario se ha eliminado con exito.',
                'success'
              )                            
            }
           setTimeout(()=> {
            window.location.reload()
           }, 3000) 
          })     
    }

    return(
        <div> 
            Aqui puedes editar a los Usuarios 

            { users.map(x=> {
                return <div>
                    
                    {/* <span>id:<b> {x._id} </b></span>
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
                } */}
                <InputUsers 
                id= {x._id}
                name= {x.name}
                role= {x.role}
                email= {x.email}
                handleChangeRole= {handleChangeRole}
                handleEditUser= {()=> handleEditUser(x)}
                />

                <Button variant="contained" color="error" onClick={()=> deleteUser(x._id)} > Eliminar Usuario </Button>
                    
                </div>
            })}

        </div>
    )
}
