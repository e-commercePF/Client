import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { clearCart, deleteOneItemFromCart, addCart, deleteAllSingleItemFromCart } from "../Redux/actions";
import { makeStyles } from '@mui/styles';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            marginTop: 100,
          },
        main_container: {
            
        },
        buttons: {
            display: 'flex',
            marginLeft:'40%'            
        },
        button_red: {
            backgroundColor: 'red',
            marginLeft: '25%',
            '&:hover': {
                backgroundColor: 'orange'
            }
        }, 
        button_green: {
            backgroundColor: 'green',
            margin: '1rem', 
            '&:hover' : {
                backgroundColor: 'yellow'
            }
        },
        button_orange: {
            backgroundColor: 'orange',
            margin: '1rem', 
            '&:hover' : {
                backgroundColor: 'yellow'
            }
        },
        img: {
            borderRadius: '50%',
            width: '5%',
            maxHeigth: '100%',           
            marginLeft: '-15rem',
            position: "absolute",
        },
        paper: {
            width: '70%',
        }, 
        main: {
            alignItems: 'center',
            marginLeft: '25%'
        }

    })

export default function Carrito(){

    const clases = useStyles()


    const dispatch = useDispatch()

   
    const { shopingCart } = useSelector(state=> state)

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
            img: x.img
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
    console.log(countMyItemResult)
  
    //calcular el total de la compra 
    const myPayToStore = ()=> {
        let myItemPrice =shopingCart.map(x=> x.price)
         let myFinallPay = myItemPrice.reduce((x,y)=> x + y)
         return myFinallPay
    }  

    let myPay = shopingCart.length > 0 ? myPayToStore().toFixed(2) : null 


 
    return (
        <div className={clases.main_container}>
            <h2> Tus compras: </h2>
            {
               shopingCart.length > 0 ? countMyItemResult.map(x=> {
                   return <div className={clases.main}>
                        <Paper elevation={2} className={clases.paper}>
                        <h4>{x.name}</h4> 
                        <img src={x.img} alt={x.name} className={clases.img}/>
                                <h5> $ {x.price.toFixed(2)} </h5>
                                <div className={clases.buttons}>
                                    <Button variant="contained"  size='small' style={{height: 15, marginTop: 20}} className={clases.button_orange} onClick={()=> deleteOneItemFromMyCart(x._id)}> - </Button>
                                        <h5 style={{marginLeft: 8, marginRigth: 8}}>Cantidad: {x.piece} </h5>
                                    <Button variant="contained"  size='small' style={{height: 15, marginTop: 20}} className={clases.button_green} onClick={()=> addOneItem(x)}> + </Button>
                                </div>

                                <Button className={clases.button_red} variant="contained" onClick={()=> deleteAllSingleItems(x)}> X </Button>
                        </Paper>
                     </div>
                   
               }) : 'Tu carrito esta vacio'            
            
            }

             {  shopingCart.length > 0 ? <h4> El total a pagar es: $ { myPay } </h4> : null }

             {  shopingCart.length > 0 ?   <Button variant="contained" color='error' onClick={clearMyCart}>
                Vaciar Carrito
            </Button> : null}

            
            {  shopingCart.length > 0 ?   <Button variant="contained" color='primary' >
                Continuar con la compra 
            </Button> : null}

        </div>
    )
}