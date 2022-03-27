import { useState } from 'react'
import { Button, Typography } from "@mui/material";

export default function InputPanel({name, quantity, price, brand, description, img, isOnStock, rating,  sku,
    __v, _id,  handleSelectQuant, handleSelectPrice, handleSubmitChanges
}){
    const [edit, setEdit] = useState(false)
    const handleEditProduct = ()=> {
        setEdit(!edit)       
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