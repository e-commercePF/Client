import { getAllUsers, updateUsers, deleteUsers } from "../Redux/actions"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import InputUsers from "./InputUsers";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const {REACT_APP_BACKEND_URL} = process.env 

export default function Users(){

  const navigate = useNavigate()


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
       },[navigate])

      

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers()
        
        )
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
              //  setTimeout(()=> {
              //   window.location.reload()
              //  }, 3000) 
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
          //  setTimeout(()=> {
          //   window.location.reload()
          //  }, 3000) 
          })     
    }

    return(
        <div> 
            Aqui puedes editar a los Usuarios 

            { users.map(x=> {
                return <div>                    
              
                <InputUsers 
                id= {x._id}
                name= {x.name}
                role= {x.role}
                email= {x.email}
                handleChangeRole= {handleChangeRole}
                handleEditUser= {()=> handleEditUser(x)}
                deleteUser= {()=> deleteUser(x._id)}
                />
{/* 
                <Button variant="contained" color="error" onClick={()=> deleteUser(x._id)} > Eliminar Usuario </Button> */}
                    
                </div>
            })}

        </div>
    )
}
