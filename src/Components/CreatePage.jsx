import { Button, Typography } from "@mui/material";
import { useFormik, Field, Form, FieldArray } from "formik"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { getAllBrand, getAllCategories } from "../Redux/actions"
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputPanel from "./InputPanel";
import Swal from 'sweetalert2'



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, text, theme) {
    return {
        fontWeight:
            text.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function Formulario() {
    const { categories, brands } = useSelector(state => state)
    const dispatch = useDispatch()
    const theme = useTheme();
    const formik = useFormik({
        onSubmit: async (valores, { resetForm }) => {           
            let infoproduct = await axios.post("http://localhost:3000/api/products/create", valores)
            if (infoproduct.data.message) {
                Swal.fire(infoproduct.data.message)                
            } else {
                Swal.fire("Producto creado con éxito")               
                resetForm("")
            }
        },
        initialValues: {
            name: "",
            description: "",
            price: "",
            quantity: "",
            img: "",
            category: [],
            brand: ""
        },

        validate: (valores) => {
            let errors = {}

            if (!valores.name) {
                errors.name = "Por favor ingrese un nombre"
            }

            if (!valores.description) {
                errors.description = "Por favor ingrese una descripción"
            }

            if (!valores.price) {
                errors.price = "Por favor ingrese un precio de venta"
            } else if (valores.price > 1000000000) {
                errors.price = "¿Está seguro de publicar a ese precio?"
            } else if (!/^[0-9.]{1,10}$/.test(valores.price)) {
                errors.price = "Solo puedes ingrsar números, los decimales van con punto ( . )"
            }

            if (!valores.quantity) {
                errors.quantity = "Por favor ingrese una cantidad"
            } else if (valores.quantity > 1000000000) {
                errors.quantity = "¿Está seguro de poseer ese stock?"
            } else if (!/^[0-9]{1,10}$/.test(valores.quantity)) {
                errors.quantity = "Solo puede ingresar números "
            }

            if (!valores.category[0]) {
                errors.category = "Selecciona al menos una categoría"
            }

            if (!valores.brand) {
                errors.brand = "Selecciona al menos una marca"
            }

            return errors
        }

    })

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllBrand())
    }, [])

    return (<div>

        <div>
            <form onSubmit={formik.handleSubmit}>

                <TextField
                    style={{ marginTop: "100px" }}
                    fullWidth
                    id="name"
                    name="name"
                    label="Nombre Producto"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    style={{ marginTop: "20px" }}
                    fullWidth
                    id="description"
                    name="description"
                    label="Descripción Producto"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <TextField
                    style={{ marginTop: "20px" }}
                    fullWidth
                    id="price"
                    name="price"
                    label="Precio Producto"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />


                <TextField
                    style={{ marginTop: "20px" }}
                    fullWidth
                    id="quantity"
                    name="quantity"
                    label="Cantidad de Stock"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                />

                <TextField
                    style={{ marginTop: "20px" }}
                    fullWidth
                    id="img"
                    name="img"
                    label="Imágen producto"
                    value={formik.values.img}
                    onChange={formik.handleChange}
                    error={formik.touched.img && Boolean(formik.errors.img)}
                    helperText={formik.touched.img && formik.errors.img}
                />
                <FormControl style={{ marginTop: "20px" }} sx={{ m: 10, width: 500 }}>
                    <InputLabel id="demo-multiple-chip-label">Categorías</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={formik.touched.category && formik.errors.category}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {categories.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, formik.values.category, theme)}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category && formik.errors.category}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl style={{ margin: "20px" }} sx={{ m: 10, width: 500 }}>
                    <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                        name="brand"
                    >
                        {brands.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, formik.values.brand, theme)}

                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>

            </form>
        </div>

    </div >)
}