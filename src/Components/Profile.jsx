import { useEffect, useState } from "react"
import axios from 'axios'
import Paper from "@material-ui/core/Paper";
import { Avatar, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopsByUser } from "../Redux/actions";

const useStyles = makeStyles({
    card: {
        margin: '1.5rem',
        backgroundColor: 'rgb(213, 217, 222)',
    },
    button: {
        backgroundColor: 'rgb(180, 250, 130)'
    }
})
export default function Profile() {
    const { myShop } = useSelector(state => state)
    const dispatch = useDispatch()
    // const [myShop, setMyShop] = useState([])
    const clases = useStyles()

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: "Bearer " + token } }
        // axios.get('http://localhost:3000/api/orders/allUser', config)
        //     .then(response => {
        //         setMyShop(response.data)
        //         //  console.log(myShop)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        dispatch(getShopsByUser(config))
        console.log(11111, myShop)
    }, [])



    const [edit, setEdit] = useState(false)
    const [url, setUrl] = useState('')

    function handeSelectPic(x) {
        try {
            //url = JSON.stringify(url)
            localStorage.setItem('foto', x)
            setEdit(false)
        } catch (e) { console.log(e) }
    }

    let img = localStorage.getItem('foto')

    //console.log(myShop)

    let contador = 1
    return (
        <div>
            <Avatar
                sx={{ width: 98, height: 98 }}
                src={img}

            >

            </Avatar>
            <h1> Bienvenido a tu perfil </h1>

            {
                !edit ? <Button onClick={() => setEdit(!edit)}> Cambiar Imagen de perfil </Button>
                    : <div> <input type='text' placeholder='selecciona la url de tu imagen' onChange={e => setUrl(e.target.value)} />
                        <Button onClick={() => handeSelectPic(url)}> Cargar imagen </Button>
                    </div>
            }


            {
                myShop.length < 1 ? <h2> Aún no compras nada,
                    que esperas ve el catalogo de Sports Market, la mejor tienda deportiva de America Latina
                </h2> :
                    myShop.map(x => {
                        return <div>
                            <Paper elevation={3} className={clases.card}>
                                <h4>Compra # {contador++} </h4>
                                <span>Fecha de compra: {x.createdAt.slice(0, 10)} </span>
                                <span>Hora de compra {x.createdAt.slice(11, 19)} </span>
                                {x.products.map(x => {
                                    return <div>
                                        <a href={`/product/${x.productId}`}>Producto: {x.name} </a>
                                        <span> Cantidad: {x.quantity} </span>
                                        <span> Precio: $ {x.price} </span>
                                        <h5> ¿Quieres dejar un comentario del producto? <Link to={`/review/${x.productId}`}> Haz click acá</Link></h5>
                                    </div>
                                }
                                )}
                                <span> Status de la compra: {x.status}</span>
                                <h4> Valor de tu compra: $ {x.amount} </h4>


                            </Paper>
                        </div>
                    })
            }

        </div>
    )
}