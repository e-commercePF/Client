import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { clearCart } from "../Redux/actions";

export default function Carrito(){
    const dispatch = useDispatch()

    const  miCarrito  = useSelector(state=> state.shopingCart) // []
    const { shopingCart } = useSelector(state=> state)

    useEffect(() => {
        console.log(111, shopingCart)
    }, [shopingCart])

      
    const vaciarCarrito = ()=> {
        dispatch(clearCart())
    }
 
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

             {  shopingCart.length > 0 ?   <Button variant="contained" color="primary" onClick={vaciarCarrito}>
                Vaciar Carrito
            </Button> : null}
        </div>
    )
}