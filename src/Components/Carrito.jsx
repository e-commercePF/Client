import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function Carrito(){

    const  miCarrito  = useSelector(state=> state.shopingCart) // []
    const { shopingCart } = useSelector(state=> state)

    useEffect(() => {
        console.log(111, shopingCart)
    }, [shopingCart])

    console.log(Array.isArray(shopingCart))
    
 
    return (
        <div>
            <h2> Tus compras: </h2>
            {
               shopingCart.length > 0 ? shopingCart.map(x=> {
                   return <div> <h4>{x.name}</h4> 
                                <h5> $ { x.price } </h5>
                        
                     </div>
                   
               }) : 'Tu carrito esta vacio'            
                 
            }
        </div>
    )
}