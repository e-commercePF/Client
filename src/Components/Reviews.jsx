import { ErrorSharp } from "@material-ui/icons"
import { Card, TextField, Button } from "@mui/material"
import axios from "axios"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'

export function Review() {
    const { productId } = useParams()
    const { myShop } = useSelector(state => state)
    const navigate = useNavigate()
    console.log(222222, productId)
    console.log(333333, myShop[0].userId)
    //    0 ${myShop[0].products[0]}

    const formik = useFormik({
        onSubmit: async (valores, { resetForm }) => {
            let review = await axios.post(`http://localhost:3000/api/review/create?userId=${myShop[0].userId}&productId=${productId}`, valores)
            console.log(44444, review.data)
            if (review.data.status === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo ha salido mal, ¿estás seguro de haber comprado este producto?',

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
    return (<div>
        <h2> Déjanos tu comentario del producto:</h2>
        <form onSubmit={formik.handleSubmit}>
            <Card style={{ flexDirection: "column" }}
                container spacing={5}
            >
                <TextField
                    multiline
                    minRows={5}
                    style={{ marginTop: "100px", width: "500px" }}
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

                    style={{ marginTop: "100px", width: "500px" }}
                    id="rating"
                    name="rating"
                    label="Puntuación"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    error={formik.touched.rating && Boolean(formik.errors.rating)}
                    helperText={formik.touched.rating && formik.errors.rating}
                    onBlur={formik.handleBlur}
                />
                <Button color="primary" variant="contained" type="submit">
                    Enviar Comentarios
                </Button>

            </Card>
        </form>
    </div>)
}
