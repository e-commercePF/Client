import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@material-ui/lab/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch , useSelector } from 'react-redux';
import { addCart, addToFavorites, deleteFromFavorites } from '../Redux/actions';
import { useState } from 'react';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function Productcard({ id, price, name, description, img, rating, quantity }) {
 //  console.log(1111, id)
  const dispatch = useDispatch()

  //let stock = quantity
  //const [cartItem, setCardItem] = useState(0)

  const { favoriteItems } = useSelector(state=> state)

  const _id = id
  let myProduct = {_id, name, price, img, rating}  
  const functionToAddProductsToMyCart = ()=> {  
    dispatch(addCart(myProduct)) 
  }

  const [addFavorite, setAddFavorite] = useState(true)
  const addMyFavoriteProduct = ()=> {
    setAddFavorite(!addFavorite)
    addFavorite ? dispatch(addToFavorites(myProduct)) : 
    dispatch(deleteFromFavorites(myProduct))
  }

  console.log(favoriteItems)
  
//  function checkAvailability(arr, val) {
//     let mapArr = arr.map(arrVal => arrVal !== null)
  
//     if(val !== null){
//     return mapArr.some(arrVal => val === arrVal._id);}

//   }

//   console.log( _id ? checkAvailability(favoriteItems, _id): "no hay id")

//  const isFaved = _id ? checkAvailability(favoriteItems, _id): false

  return (

    <Card sx={{ maxWidth: 345 }}>    

      <CardHeader
      
        action={

          <IconButton onClick={addMyFavoriteProduct}>
              { addFavorite ? 
              <FavoriteBorder/>
           : 
              <FavoriteIcon/>
          }
          </IconButton>         
        }
        title={
          <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
            {name}
          </Link>}
        subheader={
          <Typography variant="body2" color="text.secondary">
            ${price}
          </Typography>}
      />

      <CardMedia
        component="img"
        height="194"
        image={img}
        alt="myProduct"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>


      <CardActions disableSpacing>

        <IconButton aria-label="addShop">
          <AddShoppingCartIcon onClick={functionToAddProductsToMyCart}/>
        </IconButton>

        <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
      </CardActions>

    </Card>
  );
}
