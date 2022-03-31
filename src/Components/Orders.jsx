import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Orders() {
    const navigate = useNavigate()


    useEffect(() =>{
        let token = window.localStorage.getItem('token');
        let config = { headers: {
                Authorization: 'Bearer ' + token}}
          axios.get('http://localhost:3000/api/users/admin/verify', config)
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
                navigate('/')
            })
           }   ,[navigate])

    return (<>

        Hola desde tus ordenes de compras


    </>)
}