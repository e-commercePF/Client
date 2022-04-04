import {  Input, Paper } from "@material-ui/core"
import { useState } from 'react'
import { deleteCategory, updateCategoy } from "../Redux/actions"
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux"
import { Button } from "@mui/material"

export default function InputCategories({category}){
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)

    const [editCategory, setEditCategory] = useState('')

    const handleEditCategory = (e)=> {
        setEditCategory(e)
    }
    let token = window.localStorage.getItem('token')
    let config = { headers: {
            Authorization: 'Bearer ' + token}}

            //console.log(category, editCategory)
    const objeto = {
        name: editCategory
    }

    const handleSubmitCategory = ()=> {
        Swal.fire({
            title: `¡Estas a punto de editar una categoria!`,
            text: "Esta acción modificará la base de datos, ¿estas seguro que deseas continuar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, editar!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(updateCategoy(category, objeto))
             // console.log(category, objeto)
              Swal.fire(                
                'La base de datos se ha actualizado.',
                'success'
              )                            
            }
           setTimeout(()=> {
            window.location.reload()
           }, 1500) 
          })        
    }

    const handleDeleteCategory = (x)=> {
        Swal.fire({
            title: `¡Estas a punto de eliminar una categoria!`,
            text: "Esta acción modificará la base de datos, ¿estas seguro que deseas continuar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
            console.log('la categoria se elimino con exito')
            dispatch(deleteCategory(x))
              Swal.fire(                
                'La categoria se ha eliminado.',
                'success'
              )                            
            }
           setTimeout(()=> {
            window.location.reload()
           }, 1500) 
          })        
    }
    

    return(
        <div>
            <Paper elevation={3}> 
            { !edit?<div>              
                    <h2> <b> { category } </b> </h2>
                    <Button onClick={()=> setEdit(!edit)}> Editar Categoria </Button>
                </div> : <div>
                <Input type="text" 
                    placeholder={category}
                onChange={e=> handleEditCategory(e.target.value)} />
                <Button variant="contained" color='primary'  onClick={()=> handleSubmitCategory()}> Guardar Cambios </Button>
              </div>   
            }
            <Button variant="contained" color="error"
            onClick={()=> handleDeleteCategory(category)}
            >Eliminar Categoria </Button>
            {/* <span> {category} </span> */}
            </Paper>
        </div>
    )
}