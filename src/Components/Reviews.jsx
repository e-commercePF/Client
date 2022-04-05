import { ErrorSharp } from "@material-ui/icons"
import { Card, TextField, Button } from "@mui/material"
import axios from "axios"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import { makeStyles } from "@mui/styles";




const useStyles = makeStyles({
    container: {
        display: 'grid'
    },
    card: {
        backgroundColor: 'rgb(173, 184, 175)',
        boxShadow: '0 5px 5px rgb(0,0,0,0.1)',
        borderRadius: '5px',
        border: 'solid 1px black',
        alignSelf: "center",
        justifyContent: "center"

    }
})



export function Review() {
    const clases = useStyles()
    const { productId } = useParams()
    const { myShop } = useSelector(state => state)
    const navigate = useNavigate()
    // console.log(222222, productId)
    // console.log(333333, myShop[0].userId)
    //    0 ${myShop[0].products[0]}

    const formik = useFormik({
        onSubmit: async (valores, { resetForm }) => {
            let review = await axios.post(`http://localhost:3000/api/review/create?userId=${myShop[0].userId}&productId=${productId}`, valores)
            //console.log(44444, review.data)
            if (review.data.status === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo ha salido mal, parece que ya haz hecho una review a este producto, o aún no lo compras.',

                })

            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Gracias por tus comentarios!',
                })
                resetForm("")
            }
        },
        initialValues: {
            description: "",
            rating: ""
        },
        validate: (valores) => {
            let errors = {}

            if (!valores.description) {
                errors.description = "Debes agregar un comentario alproducto"
            }

            if (!valores.rating) {
                errors.rating = "debes asignar una puntiación de 0 a 5"
            } else if (valores.rating > 5 || valores.rating < 0) {
                errors.rating = "Solo puedes asignar puntado de 0 a 5"
            } else if (!/^[0-9.0-9]{1,3}$/.test(valores.rating)) {
                errors.rating = "Solo números y un decimal"
            }

            return errors
        }
    })
    return (<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2> Déjanos tu comentario del producto:</h2>
        <form onSubmit={formik.handleSubmit} style={{}}>
            <Card
                style={{ backgroundColor: "#e9e9e9", display: "flex", alignItems: "center", color: 'white', borderRadius: '5px', justifyContent: "center", flexDirection: "column" }}
                sx={{ width: 500 }} className={clases.card}>
                <TextField
                    multiline
                    minRows={5}
                    style={{ marginTop: "30px", width: "450px", justifyContent: "center", backgroundColor: "white" }}
                    id="description"
                    name="description"
                    label="Déjanos tu comentario"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    onBlur={formik.handleBlur}
                />

                <TextField

                    style={{ marginTop: "30px", width: "450px", justifySelf: "center", backgroundColor: "white" }}
                    id="rating"
                    name="rating"
                    label="Puntuación"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    error={formik.touched.rating && Boolean(formik.errors.rating)}
                    helperText={formik.touched.rating && formik.errors.rating}
                    onBlur={formik.handleBlur}
                />
                <Button style={{ backgroundColor: "black", color: 'white', borderRadius: '5px', width: "300px", margin: "15px" }} color="primary" variant="contained" fullWidth type="submit">
                    Enviar Comentarios
                </Button>

            </Card>
        </form>
    </div>)
}
