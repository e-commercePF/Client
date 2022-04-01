import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { clearCart, deleteOneItemFromCart, addCart, deleteAllSingleItemFromCart } from "../Redux/actions";
import { makeStyles } from '@mui/styles';
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';
import { useMediaQuery, } from "@mui/material";


const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            marginTop: 100,
          },
        main_container: {
            
        },
        buttons: {
            display: 'flex',
            marginLeft:'30%'            
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
            width: '30%',
           // maxHeigth: '100%',           
          //  marginLeft: '-15rem',
           // position: "absolute",
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
    const { REACT_APP_BACKEND_URL } = process.env 
    
    const navigate = useNavigate()
    const clases = useStyles()
    const { shopingCart } = useSelector(state=> state)
    
    const { shopingCart2 } = useSelector(state=> state)  

    const dispatch = useDispatch()

    const isActive = useMediaQuery("(max-width: 576px)")

    const [stripeToken,setStripeToken] = useState(null);
    
    // STRIPE -------------------- /// STRIPE 
    // STRIPE -------------------- /// STRIPE 
    const onToken = (token) =>{
        
        setStripeToken(token)
    }
    //calcular el total de la compra 
    const myPayToStore = ()=> {
        let myItemPrice =shopingCart.map(x=> x.price)
        let myFinallPay = myItemPrice.reduce((x,y)=> x + y)
        return myFinallPay
    }  
    
    let myPay = shopingCart.length > 0 ? myPayToStore().toFixed(2) : null 
   

    
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
    useEffect(() => {
        
        const makePay = async() => {
            console.log(stripeToken)
            let amount = parseInt(myPay).toFixed(2)
            const token = localStorage.getItem("token")
            let config = { headers: {Authorization: 'Bearer '+ token}}
            try{
                const res = await axios.post(`${REACT_APP_BACKEND_URL}/api/payment/create`,{
                    tokenId: stripeToken.id,
                    amount: amount
                },config).then(response=>{
                    console.log(response.data)
                    window.localStorage.removeItem('carrito');
                    return response.data
                    
                }).catch(error =>{
                    console.log(error)
                })
                console.log("toy aca", countMyItemResult)
                navigate("/success", {
                    state: {
                        userId: res.userId,
                        products:countMyItemResult.map(prod=> {
                            return {
                                name: prod.name,
                                price: prod.price,
                                quantity: prod.piece,
                                img: prod.img,
                                productId: prod._id,
                            }
                        }),
                        amount: amount,
                        address: res.address,
                        orderId: res.orderId
                    }
                })
            }
            catch(e){
                console.log(e)
            }
            
        }
        stripeToken && makePay()
    },[shopingCart,navigate, stripeToken,myPay,shopingCart2, countMyItemResult, REACT_APP_BACKEND_URL])
    
 
    return (
        <div className={clases.main_container}>
            <h2> Tus compras: </h2>
            {
                isActive ? 
                shopingCart.length > 0 ? countMyItemResult.map(x=> {
                    return <div className={clases.main}>
                         <Paper elevation={2} className={clases.paper}
                            style={{width: '80%'}}
                         >
                         <h4>{x.name}</h4> 
                         <img src={x.img} alt={x.name} className={clases.img}/>
                                 <h5> $ {x.price.toFixed(2)} </h5>
                                 <div className={clases.buttons} style={{marginLeft: '0', width: '90%'}}>
                                     <Button variant="contained"  size='small' style={{height: 15,  }} className={clases.button_orange} onClick={()=> deleteOneItemFromMyCart(x._id)}> - </Button>
                                         <h5 style={{}}>Cantidad: {x.piece} </h5>
                                     <Button variant="contained"  size='small' style={{height: 15, }} className={clases.button_green} onClick={()=> addOneItem(x)}> + </Button>
                                 </div>
 
                                 <Button className={clases.button_red} variant="contained" onClick={()=> deleteAllSingleItems(x)}> X </Button>
                         </Paper>
                      </div>
                    
                }) : 'Tu carrito esta vacio'   :             
            
               shopingCart.length > 0 ? countMyItemResult.map(x=> {
                   return <div className={clases.main}>
                        <Paper elevation={2} className={clases.paper}>
                        <h4>{x.name}</h4> 
                        <img src={x.img} alt={x.name} className={clases.img}/>
                                <h5> $ {x.price.toFixed(2)} </h5>
                                <div className={clases.buttons}>
                                    <Button variant="contained"  size='small' style={{height: 15, marginTop: 20}} className={clases.button_orange} onClick={()=> deleteOneItemFromMyCart(x._id)}> - </Button>
                                        <h5 style={{marginLeft: 8, marginRigth: 8}}>Cantidad: {x.piece} </h5>
                                    <Button variant="contained"  size='small' style={{height: 15, marginTop: 20, marginLeft: '0.5rem'}} className={clases.button_green} onClick={()=> addOneItem(x)}> + </Button>
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

            
            { myPay ? <StripeCheckout
            token={onToken}
            stripeKey="pk_test_51KgvfFHEEv1tXsVZEpffi9X0VHCJ2XpgfPxentUc7Hx1qiTrS3uR1vXz0KDqpDkKBI5YX8ZLhxqah7FJhqK2vKXC00G70EZnc4"
            name="Sport Market"
            billingAddress
            shippingAddress
            description={`Your total is ${myPay}`}
            amount={myPay * 100}
            >
            </StripeCheckout> 
            : null}
            
        </div>
    )
}