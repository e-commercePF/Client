import { useSelector } from "react-redux"
import Card from "./Card"
import Grid from '@material-ui/core/Grid';

export default function ResultSearch() {
    const { resultSearch, haveResult } = useSelector(state => state)

    return (<div>
        <Grid container spacing={2}>
        {
            (resultSearch.length !== 0) ?
                resultSearch.map((e, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3}
                        key={index}
                    >
                        <Card
                            rating={e.rating}
                            id={e._id}
                            sku={e.sku}
                            name={e.name}
                            description={e.description}
                            price={e.price}
                            quantity={e.quantity}
                            isOnStock={e.isOnStock}
                            img={e.img}
                            category={e.category}
                            __v={e.__v} />

                    </Grid>

                ))
                : ((!haveResult) ? <div> Loading </div> : <></>)
        }</Grid>


        {(haveResult) ? <div>
            <img src="https://cdn-icons-png.flaticon.com/512/6134/6134116.png" alt="img" width={300} style={{ marginTop: 50 }} />
            <h2>No hemos encontrado un producto </h2>

        </div> : <></>}
        
    </div>)
}