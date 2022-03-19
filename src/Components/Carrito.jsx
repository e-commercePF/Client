import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { clearCart, deleteOneItemFromCart } from "../Redux/actions";

export default function Carrito(){
    const dispatch = useDispatch()

   
    const { shopingCart } = useSelector(state=> state)

    useEffect(() => {
    }, [shopingCart])

      
    const clearMyCart = ()=> {
        dispatch(clearCart())
    }

    const deleteOneItemFromMyCart = (id)=> { 
        console.log(id)      
        dispatch(deleteOneItemFromCart(id))        
    }

    //obtener cantidad de un articulo en particular 
    const countMyItem = ()=> {
        let myItemName = shopingCart.map(x=> Object.assign({
            _id: x._id,
            piece: 1,
            name: x.name,
            price: x.price,
        }))
    
        let myCartWithoutTwoItems = myItemName.reduce((acc, el)=> {
            let existingElement = acc.find(e=> e._id === el._id)           
            if(existingElement){
                return acc.map(x=> {
                    if(x._id === el._id){
                        return {
                            ...x,
                            piece: x.piece + el.piece
                        }
                    }
                    return x
                })
            }
            return [...acc, el]
        }, [])
     
        return myCartWithoutTwoItems
    }
    
    let countMyItemResult = shopingCart.length > 0 ? countMyItem() : null 
  
    //calcular el total de la compra 
    const myPayToStore = ()=> {
        let myItemPrice =shopingCart.map(x=> x.price)
         let myFinallPay = myItemPrice.reduce((x,y)=> x + y)
         return myFinallPay
    }  

    let myPay = shopingCart.length > 0 ? myPayToStore() : null 
 
    return (
        <div>
            <h2> Tus compras: </h2>
            {
               shopingCart.length > 0 ? countMyItemResult.map(x=> {
                   return <div> <h4>{x.name}</h4> 
                                <h5> $ {x.price} </h5>
                                <h5>Cantidad: {x.piece} </h5>
                                <Button variant="contained" color="secondary" onClick={()=> deleteOneItemFromMyCart(x._id)}> X </Button>
                        
                     </div>
                   
               }) : 'Tu carrito esta vacio'            
            
            }

             {  shopingCart.length > 0 ? <h4> El total a pagar es: $ { myPay } </h4> : null }

             {  shopingCart.length > 0 ?   <Button variant="contained" color="primary" onClick={clearMyCart}>

             

                Vaciar Carrito
            </Button> : null}
        </div>
    )
}