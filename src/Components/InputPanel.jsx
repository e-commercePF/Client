import { useState, useEffect } from 'react'
import { Button, Paper, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../Redux/actions';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    paper: {
        backgroundColor: 'rgb(173, 184, 175)',
        boxShadow: '0 5px 5px rgb(0,0,0,0.1)', 
        borderRadius: '5px',
        border: 'solid 1px black'
    }, 
    card: {
        margin: '1.5em'
    }
})

export default function InputPanel({name, quantity, price, brand, description, img, isOnStock, rating,  sku,
    __v, _id,  handleSelectQuant, handleSelectPrice, handleSubmitChanges, category, handleAddCategory, 
    handleDeleteCategory, cate, handleDeleteProduct
}){

    const clases = useStyles()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const handleEditProduct = ()=> {
        setEdit(!edit)       
    }

    useEffect(() => {
        dispatch(getAllCategories())        
    }, [])
    const { categories } = useSelector(state=> state)    

    return (        
            <div className={clases.card}>
             <Typography variant='subtittle1'>  
               Product_ID: { _id }                
            </Typography>
            <Typography variant='h5'>
                 { name } 
             </Typography>
            { edit ? 
                <span> Cantidad: <input type="number" name='quantity' min='0' placeholder={quantity}  onChange={e=> handleSelectQuant(e.target.value)} /></span> 
            : <span>  Cantidad: <b>{ quantity }</b> </span>}

            
            { edit ? 
                <span> Precio: <input type="number" name='quantity' min='0' placeholder={price} onChange={e=> handleSelectPrice(e.target.value)}/></span> 
            : <span> Precio: <b> $ { price }  </b> </span> }

            { edit ?
            <div>
            <select onChange={e=> handleAddCategory(e.target.value)}> 
                <option value={category}> Selecciona las categorias de tu producto </option>
                { categories.map(x=> <option value={x}> {x} </option>)}
                
            </select> 
            <Paper>
            Tus categorias seleccionadas: 
                
                    { category.map(x=> {
                    return <div>
                        <h4> {x} </h4>
                        <Button variant="contained" color="error" onClick={()=> handleDeleteCategory(x)}> X </Button>
                    </div>
                    }) }
                
            </Paper>  
            </div>
            : 
            <div>
              
                <span> Categorias </span> 
                { cate.map(x=> <span> <b> {x} </b> </span>) }
            </div>
        }
            
           <Grid container direction='column' sx={{paddingLeft: '3em', paddingRight: '3em'}}>
            { edit ? 
        
                 <Button variant="contained" color="secondary" 
               
                 onClick={(x)=> handleSubmitChanges(x)}
                >
                    Guardar Cambios
                </Button> : <Button variant="contained" color="secondary" onClick={()=> handleEditProduct()} >
                    Editar Producto
                </Button> }
            <Button  variant="contained" color="error" onClick={()=> handleDeleteProduct()} > Eliminar Producto </Button>
            </Grid>
                
        </div>

        
    )
}