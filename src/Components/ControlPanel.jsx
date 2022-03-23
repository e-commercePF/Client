import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/actions";
import Stock from "./Stock";
import Button from "@material-ui/core/Button";


export default function ControlPanel(){
    const [stock, setStock] = useState(false)
    const handleShowStock = ()=> {
        setStock(!stock)
    }

    
    
    
    return <div>
                 <h1>Bienvenido Administrador</h1>
                 <div>
                     <Button variant="contained" color="primary" onClick={handleShowStock}> Stock </Button>
                 </div>
                 {stock ? <Stock /> : null}
            


                   
                   
           </div>
}