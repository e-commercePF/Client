import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, editTheProduct, deleteOneItemFromStock } from "../Redux/actions";
import { Button } from "@mui/material";
import InputPanel from "./InputPanel";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const {REACT_APP_BACKEND_URL} = process.env 

export default function Stock(){

    const navigate = useNavigate()

    useEffect(() =>{
        let token = window.localStorage.getItem('token');
        let config = { headers: {
                Authorization: 'Bearer ' + token}}
                axios.get(`${REACT_APP_BACKEND_URL}/api/users/admin/verify`, config)
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
                navigate('/')
            })
           }   ,[navigate])
           
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const { product } = useSelector(state => state)
    let productsValue = product.map(x=> x.quantity * x.price)
    let investment =  productsValue.reduce((acc, el) => acc + el, 0) 

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
     

    const handleChangeProduct = (x)=> {
        setMyNewDataProduct({
            brand: x.brand,
            description: x.description,
            img: x.img,
            isOnStock: x.isOnStock,
            name: x.name,
            price: price ||x.price,
            quantity: quant ,            
            rating: x.rating,
            sku: x.sku,
            __v: x.__v,
            _id: x._id,
        })
    }

    const handleSubmitChanges = (x)=> {
       handleChangeProduct(x) 

        let check2 = myNewDataProduct._id !== ''  

        if(check2 && myNewDataProduct.price > -1 && myNewDataProduct.quantity > -1){
            Swal.fire({
                title: '¡Estas a punto de editar a un producto!',
                text: "Esta acción es modificara la base de datos, ¿estas seguro que deseas continuar?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, modificar!'
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(editTheProduct(myNewDataProduct))
                  Swal.fire(
                    'Producto modificado!',
                    'La base de datos se ha actualizado.',
                    'success'
                  )                            
                }
               setTimeout(()=> {
                window.location.reload()
               }, 3000) 
              })
        }
     }

     const handleDeleteProduct = (x)=> {
        Swal.fire({
            title: '¡Estas a punto de eliminar un producto definitivamente!',
            text: " esta accion es irremediable ¿estas seguro que deseas continual?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteOneItemFromStock(x._id))
              Swal.fire(
                'Producto eliminado!',
                'La base de datos se ha actualizado.',
                'success'
              )                            
            }
           setTimeout(()=> {
            window.location.reload()
           }, 3000) 
          })

     }
    return (
        <div>
             <h3> Tu Inventario actual: </h3>

            {
        product.map(x=> {
            return <div> 

                <InputPanel 
                name= {x.name}
                quantity= {x.quantity}
                price= {x.price}
                brand= {x.brand}
                description= {x.description}
                img= {x.img}
                isOnStock= {x.isOnStock}                           
                rating= {x.rating}
                sku= {x.sku}
                __v= {x.__v}
                _id= {x._id}
                handleSelectQuant= {handleSelectQuant}
                handleSelectPrice = {handleSelectPrice}
                handleSubmitChanges= {()=> handleSubmitChanges(x)}
                />                 
               
                <Button  variant="contained" color="error" onClick={()=> handleDeleteProduct(x)}> Eliminar Producto </Button>
            </div>                        
                })   
            }     
    <h1> Tu inversion en SportsMarket: <b> $ {investment} </b> </h1>
        </div>
    )
}