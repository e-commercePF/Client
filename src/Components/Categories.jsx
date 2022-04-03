import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../Redux/actions"
import InputCategories from "./InputCategories"
import { Button, ButtonBase, Input, Paper } from "@material-ui/core"
import { makeStyles } from '@mui/styles';
import Swal from 'sweetalert2'
import { createCategory } from "../Redux/actions"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles({
    input:{
        borderRadius: '0.5rem',
        border: 'solid 1px black'
    }
})

export default function Categories(){
    const navigate = useNavigate()
    const clases = useStyles()
  
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCategories())        
    }, [])
    const { categories } = useSelector(state=> state)



    const [newCategory, setNewCategory] = useState('')

    let objeto = {
        name: newCategory
    }

    const handleSubmitNewCategory = (newCategory)=> {
        Swal.fire({
            title: `¡Estas a punto de crear una nueva categoria!`,
            text: "Esta acción modificará la base de datos, ¿estas seguro que deseas continuar?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, crear!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(createCategory(objeto))
              Swal.fire(
                `${newCategory} se ha añadido a las categorias de Sports Market`,
                'La base esta actualizada.',
                'success'
              )                            
            }
           setTimeout(()=> {
            window.location.reload()
           }, 3000) 
          })
    }

    const handleInputChange = (e)=> {
        e = e.trim()
        setNewCategory(e)
    }
    

    return(
        <div>             
            <h1> A continuación puedes ver y editar las categorias de tus productos: </h1>
            { categories.map(x=>  <InputCategories category={ x } />) }

            <Paper>
                <h2>Deseas crear una nueva Categoria:</h2>
                <Input className={clases.input}
                placeholder='Escribe tu nueva categoria'
                onChange={e=> handleInputChange(e.target.value)}
                /> 

                <Button variant="contained" color="primary" onClick={()=> handleSubmitNewCategory(newCategory)}> Cargar Nueva Categoria </Button>
            </Paper>

        </div>
    )
}