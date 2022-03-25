import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import  { Button } from "@mui/material";
import { deleteFromFavorites } from "../Redux/actions";
import Rating from '@material-ui/lab/Rating';
import { addCart } from "../Redux/actions";

export default function Favorites (){
    const dispatch = useDispatch()
  
    const { favoriteItems } = useSelector(state=> state)

    useEffect(() => {
    }, [favoriteItems])

    //console.log(111, favoriteItems)
    //let productsToShow = favoriteItems.filter(x=> x !== null)
    let productsToShow = favoriteItems
    console.log(productsToShow)

    const deletemyProduct = (e)=> {
       // console.log(111, e)
        dispatch(deleteFromFavorites(e))
    }

    const handleAddCart = (e) => {
        dispatch(addCart(e))        
    }  

    return (
        <div>
            <h1> Estos son tus productos favoritos </h1>            

            {
                productsToShow.length > 0 ?                 
                productsToShow.map((e,index)=> {
                   return  <div
                    key={index}>
                     <div>
                <Button variant="contained" color="secondary" onClick={()=> deletemyProduct(e)}> X </Button>
                <h1> {e.name} </h1>
                <img src={e.img} alt="img" w_idth='500px' height='500px' /> <br />
                <category> <b> Categoria: </b> {e.category} </category>
                <h4>Rating:
                    <Rating name="half-rating-read" value={e.rating} precision={0.5} readOnly />
                </h4>
                <span> <b> Descripción: </b>  {e.description} </span>
                <h5> Precio: $ {e.price} </h5>
                <Button variant="contained" color="primary" onClick={()=> handleAddCart(e)}>
                     Agregar al carrito ahora 
                </Button>
            </div>         
           

                </div>
                }) : <h3> Aun no tienes productos favoritos </h3>

            }
        </div> 
    )
}