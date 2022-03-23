import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/actions";


export default function ControlPanel(){

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const { product } = useSelector(state => state)

//    let productsValue = []
//    product.forEach(x=> productsValue.push(x.quantity * x.price))
    let productsValue = product.map(x=> x.quantity * x.price)

   let investment =  productsValue.reduce((acc, el) => acc + el, 0) 
    
    return <div>
                 <h1>Bienvenido Administrador</h1>

                    <h3> Tu Inventario actual: </h3>

                 {
                    product.map(x=> {
                        return <div>
                            <span> {x.name} : </span> 
                            <span> cantidad {x.quantity} </span>
                            <span> costo por unidad: $ {x.price} </span>                            
                        </div>                        
                    })   
                  }     
                    <h1> Tu inversion en SportsMarket: <b> $ {investment}</b> </h1>
           </div>
}