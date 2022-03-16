import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';


export default function Detail(){
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

        console.log(myProduct.rati)
    return (
    <div>

        <div>
            <h1> { myProduct.title } </h1>
            <img src={myProduct.image} alt={myProduct.title} width='500px' height='500px'/> <br/>
            <category> <b> Categoria: </b> {myProduct.category} </category>
            <h4>Rating:  
            <Rating name="half-rating-read" value={myProduct.rating.rate} precision={0.5} readOnly /> 
            </h4>
            <span> <b> Descripción: </b>  { myProduct.description } </span>
            <h5> Precio: $ { myProduct.price } </h5>

        </div>

        <Button variant="contained" color="primary">
         Agregar al carrito
        </Button>

       <h5> Stock Actual: x </h5>


    </div>
    )
}