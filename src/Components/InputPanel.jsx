import { useState, useEffect } from 'react'
import { Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../Redux/actions';


export default function InputPanel({name, quantity, price, brand, description, img, isOnStock, rating,  sku,
    __v, _id,  handleSelectQuant, handleSelectPrice, handleSubmitChanges, category, 
}){
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const handleEditProduct = ()=> {
        setEdit(!edit)       
    }

    useEffect(() => {
        dispatch(getAllCategories())        
    }, [])
    const { categories } = useSelector(state=> state)
 
     const [myCategory, setMyCategory] = useState(category)

    const handleAddCategory = (e)=> { 
        if(myCategory.some(x=> x!== e)) {
            setMyCategory([...myCategory, e])
        }          
    }
    const handleDeleteCategory = (name)=> {
        const newCategory = myCategory.filter(x=> x!== name)
        setMyCategory(newCategory)
        //console.log(myCategory)
    }

    return (
        <div> 
            <span> Product_ID: { _id } </span>
            <span> <b> { name } </b></span> 

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
                
                    { myCategory.map(x=> {
                    return <div>
                        <h4> {x} </h4>
                        <Button variant="contained" color="error" onClick={()=> handleDeleteCategory(x)}> X </Button>
                    </div>
                    }) }
                
            </Paper>  
            </div>
            : 
            <div>
                { category.map(x=> <span> <b> {x} </b> </span>) }
            </div>
        }
            
          
            { edit ?                     
                 <Button variant="contained" color="secondary" 
               
                 onClick={(x)=> handleSubmitChanges(x)}
                >
                    Guardar Cambios
                </Button> : <Button variant="contained" color="primary" onClick={()=> handleEditProduct()}>
                    Editar Producto
                </Button> }

        </div>
    )
}