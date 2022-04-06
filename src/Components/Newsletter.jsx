import React from "react";
import { Card, TextField, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";




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





export default function Newsletter() {
 const navigate = useNavigate()
      useEffect(() =>{
        let token = window.localStorage.getItem('token');
        let config = { headers: {
                Authorization: 'Bearer ' + token}}
                axios.get(`http://localhost:3000/api/users/admin/verify`, config)
            .then(res => {
                //console.log(res.data)
            }).catch(err => {
                console.log(err)
                navigate('/')
            })
           }, [navigate])

    const clases = useStyles()
     const formik = useFormik({
        onSubmit: async (valores,{ resetForm }) => {
            try {
				axios({
					method: 'POST',
					url: "http://localhost:3000/api/users/sendNewsletter",
					data: {
					    content: valores.content,
                        title: valores.title,
					}
				  }).then(response =>{
                    Swal.fire(response.data.message)
                   
				   }).catch(err=>{ 
                    if(err.response.status === 400){
                     Swal.fire(err.response.data.error)
                    }})

                  }catch(e) { 
				console.log("newssleter", e)
			}
            resetForm("")
        },
            initialValues: {
                content: "",
                title: ""
            },
            validate: (valores) => {
                let errors = {}
    
                if (!valores.content) {
                    errors.content = "You must add a content"
                }
    
                if (!valores.title) {
                    errors.title = "you must assign a title"
                } 
                return errors
            } })
        



    return (<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2> create your newsletter:</h2>
        <form onSubmit= {formik.handleSubmit} style={{}}>
            <Card
                style={{ backgroundColor: "#e9e9e9", display: "flex", alignItems: "center", color: 'white', borderRadius: '5px', justifyContent: "center", flexDirection: "column" }}
                sx={{ width: 500 }} className={clases.card}>

                         <TextField

                         style={{ marginTop: "30px", width: "450px", justifySelf: "center", backgroundColor: "white" }}
                        id="title"
                        name="title"
                        label="tittle"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        onBlur={formik.handleBlur}/>  
                    <TextField
                    multiline
                    minRows={5}
                    style={{ marginTop: "30px", width: "450px", justifyContent: "center", backgroundColor: "white" }}
                    id="content"
                    name="content"
                    label="write the newsletter"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.content)}
                    helperText={formik.touched.description && formik.errors.content}
                    onBlur={formik.handleBlur}
                />

             
                <Button style={{ backgroundColor: "black", color: 'white', borderRadius: '5px', width: "300px", margin: "15px" }} color="primary" variant="contained" fullWidth type="submit">
                    Create
                </Button>

            </Card>
        </form>
    </div>)
}