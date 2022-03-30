import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Success(){
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)
    useEffect(() => {
        if(location.state){
        axios.post('http://localhost:3000/api/orders', location.state).then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    } else {
        navigate('/')
    }
    })

    return (
        <div>
            <h1>Purchase made successfully</h1>
        </div>
    )
}