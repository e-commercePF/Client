import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, editTheProduct, deleteOneItemFromStock } from "../Redux/actions";
import { Button, Paper } from "@mui/material";
import InputPanel from "./InputPanel";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';

const {REACT_APP_BACKEND_URL} = process.env 

const useStyles = makeStyles({
    paper: {
    backgroundColor: 'rgb(213, 217, 222)',
    boxShadow: '0 5px 5px rgb(0,0,0,0.1)', 
    borderRadius: '10px',
    border: 'solid 1px black',
    margin: '2em' 
    }
    
})

export default function Stock(){

    const clases = useStyles()

    const navigate = useNavigate()

    useEffect(() =>{
        let token = window.localStorage.getItem('token');
        let config = { headers: {
                Authorization: 'Bearer ' + token}}
                axios.get(`${REACT_APP_BACKEND_URL}/api/users/admin/verify`, config)
            .then(res => {
                //console.log(res.data)
            }).catch(err => {
                console.log(err)
                navigate('/')
            })
           }, [navigate])
           
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const [myCategory, setMyCategory] = useState([])

    const handleAddCategory = (e)=> {
        setMyCategory([...myCategory, e])
        
    }
    const handleDeleteCategory = (name)=> {
        const newCategory = myCategory.filter(x=> x!== name)
        setMyCategory(newCategory)
        
    }

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
            category: myCategory === [] ? x.category : myCategory,
            brand: x.brand,
            description: x.description,
            img: x.img,
            isOnStock: x.isOnStock,
            name: x.name,
            price: price || x.price,
            quantity: quant,            
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
                  window.location.reload()
                  Swal.fire(
                    'Producto modificado!',
                    'La base de datos se ha actualizado.',
                    'success'
                  )                            
                }
            //    setTimeout(()=> {
            //     window.location.reload()
            //    }, 3000) 
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
                <Paper className={clases.paper}>
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
                category={myCategory}
                handleDeleteCategory={handleDeleteCategory}
                handleAddCategory={handleAddCategory}
                handleSelectQuant= {handleSelectQuant}
                handleSelectPrice = {handleSelectPrice}
                handleSubmitChanges= {()=> handleSubmitChanges(x)}
                cate= {x.category}
                handleDeleteProduct={()=> handleDeleteProduct(x)}
                
             
                />                
               
                {/* <Button  variant="contained" color="error" onClick={()=> handleDeleteProduct(x)}> Eliminar Producto </Button> */}
                </Paper> 
            </div>                        
                })   
            } 

    <h1> Tu inversion en SportsMarket: <b> $ {investment} </b> </h1>
        </div>
    )
}