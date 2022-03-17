import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailProduct } from "../Redux/actions";


export default function Detail() {
    const { id } = useParams()
    const { detailproduct } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailProduct(id))
    }, [])
    return (
        <div>

            <div>
                <h1> {detailproduct.name} </h1>
                <img src={detailproduct.image} alt="img" width='500px' height='500px' /> <br />
                <category> <b> Categoria: </b> {detailproduct.category} </category>
                {/* <h4>Rating:
                    <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                </h4> */}
                <span> <b> Descripción: </b>  {detailproduct.description} </span>
                <h5> Precio: $ {detailproduct.price} </h5>

            </div>

            <Button variant="contained" color="primary">
                Agregar al carrito
            </Button>

            <h5> Stock Actual: x </h5>


        </div>
    )
}