import { Button, Typography, Grid, Divider,Paper ,Box } from "@mui/material";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteFromFavorites } from "../Redux/actions";
import Rating from '@material-ui/lab/Rating';
import { addCart } from "../Redux/actions";
import { makeStyles } from '@mui/styles';

export default function Favorites (){
    const dispatch = useDispatch()
    const useStyles = makeStyles((theme) => ({
        root: {
            paddingTop: "3em"
        },
    }));
    const classes = useStyles();
    const { favoriteItems } = useSelector(state=> state)

    useEffect(() => {
    }, [favoriteItems])

    let productsToShow = favoriteItems

    const deletemyProduct = (e)=> {
        dispatch(deleteFromFavorites(e))
    }

    const handleAddCart = (e) => {
        dispatch(addCart(e))        
    }  

    return (
        <div className={classes.root}>
            <Typography variant="h4" sx={{margin:"1em"}}>Estos son tus productos favoritos</Typography>        
            {productsToShow.length > 0 ?                 
            productsToShow.map((e,index)=> {
            return (   
                <div key={index}>
                    <Grid sx={{padding:"1em"}}>
                        <Paper elevation={3}>
                            <Grid container >
                            <Grid item sm = {3} mt={3}>
                                <img src={e.img} alt="img" width={'90%'} height={'90%'} /> 
                            </Grid>
                            <Grid item sm = {9}>
                                <Grid container >
                                    <Grid item sm={11}>
                                    <Typography variant="h5">{e.name}</Typography>
                                    </Grid>
                                    <Grid item sm={1}>
                                    <Button variant="contained" color="secondary" onClick={()=> deletemyProduct(e)}>X</Button>
                                    </Grid>
                                </Grid>
                                <Divider></Divider>
                                <Grid container direction="column" >
                                    <Box  mt={2} mb={2} pr="4em">
                                        <Rating name="half-rating-read" value={e.rating} precision={0.5} readOnly />
                                        {e.category}
                                        <Typography variant="subtitle1" >{e.description}</Typography>
                                        <Typography variant="subtitle1" >${e.price}</Typography>
                                    </Box>
                                    <Button variant="contained" color="secondary" sx={{margin:"4em" }} onClick={()=> handleAddCart(e)}>
                                        Agregar al carrito ahora 
                                    </Button>
                                </Grid>
                            </Grid>
                            </Grid>
                        </Paper>
                    </Grid>     
                </div>
            )
            }) : <h3> Aun no tienes productos favoritos </h3> }
        </div> 
    )
}