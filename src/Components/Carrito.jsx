import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { clearCart, deleteOneItemFromCart, addCart, deleteAllSingleItemFromCart } from "../Redux/actions";

export default function Carrito(){
    const dispatch = useDispatch()

   
    const { shopingCart } = useSelector(state=> state)
   // const shopingCart = JSON.parse(localStorage.getItem("carrito"))

    useEffect(() => {
    }, [shopingCart])

    const { shopingCart2 } = useSelector(state=> state)
    useEffect(() => {
    }, [shopingCart2])

    console.log(shopingCart2)
      
    const clearMyCart = ()=> {
        dispatch(clearCart())
    }

    const deleteOneItemFromMyCart = (id)=> {      
        dispatch(deleteOneItemFromCart(id))        
    }

    const addOneItem = (id)=> {
        console.log('soy el carro + ' + id)
        dispatch(addCart(id))
    }

    const deleteAllSingleItems = (e)=> {
        dispatch(deleteAllSingleItemFromCart(e))
    }
     
    //obtener cantidad de un articulo en particular 
    const countMyItem = ()=> {
        let myItemName = shopingCart.map(x=> Object.assign({
            _id: x._id,
            piece: 1,
            name: x.name,
            price: x.price,
            quantity: x.quantity,
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

    let myPay = shopingCart.length > 0 ? myPayToStore().toFixed(2) : null 


 
    return (
        <div>
            <h2> Tus compras: </h2>
            {
               shopingCart.length > 0 ? countMyItemResult.map(x=> {
                   return <div> <h4>{x.name}</h4> 
                                <h5> $ {x.price.toFixed(2)} </h5>
                                <div style={{display: 'flex', marginLeft: 660}}>
                                    <Button variant="contained" color="secondary" size='small'style={{height: 15, marginTop: 20}} onClick={()=> deleteOneItemFromMyCart(x._id)}> - </Button>
                                        <h5 style={{marginLeft: 8, marginRigth: 8}}>Cantidad: {x.piece} </h5>
                                    <Button variant="contained" color="primary" size='small' style={{height: 15, marginTop: 20}} onClick={()=> addOneItem(x)}> + </Button>
                                </div>

                                <Button variant="contained" color="secondary" onClick={()=> deleteAllSingleItems(x)}> X </Button>
                        
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