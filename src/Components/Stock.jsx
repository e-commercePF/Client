import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, editTheProduct } from "../Redux/actions";
import Button from "@material-ui/core/Button";


export default function Stock(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const { product } = useSelector(state => state)
    let productsValue = product.map(x=> x.quantity * x.price)
    let investment =  productsValue.reduce((acc, el) => acc + el, 0) 
   // console.log(product)

    const [edit, setEdit] = useState(false)
    const handleEditProduct = ()=> {
        setEdit(!edit)
    }

    const [price, setPrice] = useState(0)
    const handleSelectPrice= (e)=> {
        setPrice(Number(e))
    }

    const [quant, setQuant] = useState(0)
    const handleSelectQuant= (e)=> {
        setQuant(Number(e))
    }
    

    const [myNewDataProduct, setMyNewDataProduct] = useState({
        brand: "",
        description: "",
        img: "",
        isOnStock: true,
        name: "",
        price: 0,
        quantity: 0,
        rating: 0,
        sku: "",
        __v: 0,
        _id: "",
    })

    const handleChangeProduct = (x)=> {
        setMyNewDataProduct({
            brand: x.brand,
            description: x.description,
            img: x.img,
            isOnStock: x.isOnStock,
            name: x.name,

            price: price,
            quantity: quant,
            
            rating: x.rating,
            sku: x.sku,
            __v: x.__v,
            _id: x._id,
        })
    }

    const handleSubmitChanges = (x)=> { 
          //console.log(myNewDataProduct) 
        handleChangeProduct(x)   
        let check = window.confirm("¿estas seguro que deseas modificar la base de datos?")  
        console.log(check)
        if(check)  {
        dispatch(editTheProduct(myNewDataProduct))
        alert("La base de datos se ha actualizado")
        }      
     }

    return (
        <div>
             <h3> Tu Inventario actual: </h3>

            {
        product.map(x=> {
            return <div>                    
                 <span> {x.name} : </span> 
             
                { edit ? <span> Cantidad: <input type="number" name='quantity'  placeholder={x.quantity} onChange={e=> handleSelectQuant(e.target.value)}/></span> : <span> cantidad {x.quantity} </span>}
            
                {edit ? <span> Costo por unidad: <input type="number" name='price'  placeholder={x.price} onChange={e=> handleSelectPrice(e.target.value)} /></span> : <span> costo por unidad: $ {x.price} </span>}
                { edit ? <Button variant="contained" color="secondary" onClick={()=> handleSubmitChanges(x)}>
                    Guardar Cambios
                </Button> : <Button variant="contained" color="primary" onClick={()=> handleEditProduct()}>
                    Editar Producto
                </Button> }
            </div>                        
                })   
            }     
    <h1> Tu inversion en SportsMarket: <b> $ {investment} </b> </h1>
        </div>
    )
}