import { useSelector } from "react-redux"
import Card from "./Card"

export default function ResultSearch() {
    const { resultSearch, haveResult } = useSelector(state => state)

    return (<div>

        {
            (resultSearch.length !== 0) ?
                resultSearch.map((e, index) => (
                    <div
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

                    </div>

                ))
                : <div> Loading </div>
        }


        {(haveResult) ? <div>
            <img src="https://cdn-icons-png.flaticon.com/512/6134/6134116.png" alt="img" />
            <h2>No hemos encontrado un producto </h2>

        </div> : <></>}
    </div>)
}