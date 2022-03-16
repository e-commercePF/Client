import * as React from 'react';
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


export default function productcard() {

    const myProduct = {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
        "rate": 3.5,
        "count": 120
        },
    }


  return (

    <Card sx={{ maxWidth: 345 }}>
      
      <CardHeader
        action={    
          <IconButton  onClick={() => console.log("addFavorite")}>
            <FavoriteIcon />
          </IconButton>
        }
        title={myProduct.title}
        subheader= {myProduct.price}
      />

      <CardMedia
        component="img"
        height="194"
        image={myProduct.image}
        alt="myProduct"
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {myProduct.description}
        </Typography>
      </CardContent>


      <CardActions disableSpacing>
      
        <IconButton aria-label="addShop">
            <AddShoppingCartIcon/>
        </IconButton>

        <Rating name="half-rating-read" value={myProduct.rating.rate} precision={0.5} readOnly /> 
      </CardActions>

    </Card>
  );
}
