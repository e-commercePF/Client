import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function Success(){
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)
    
    useEffect(() => {
        const token = localStorage.getItem("token")             
        let config = { headers: {Authorization: 'Bearer '+ token}}
        if(location.state){
        axios.post('http://localhost:3000/api/orders', location.state, config).then(response => {
          console.log(response)  })
        .catch(error => {
            console.log(error)
        })
    } else {
        navigate('/')
    }
    })
    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
      }
    
      const rows = location.state.products
  console.log(location.state.products)
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
            <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{rows.map(e => e.total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    )
}


////////////////////////////////






