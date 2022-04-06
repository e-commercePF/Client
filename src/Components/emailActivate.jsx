import { useEffect } from "react"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function EmailActivate() {
    const navigate = useNavigate()
    const { token } = useParams()

    useEffect(() => {
        axios.post(`http://localhost:3000/api/auth/email-activate/${token}`)
            .then(response => {
                console.log(response)

            })
            .catch(error => {
                console.log(error)

            })



    }, [navigate, token])


    return <h1> Account activated satisfactory </h1>
}