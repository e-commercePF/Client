import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button, Typography } from "@mui/material";
import Paper from "@material-ui/core/Paper";

const stripePromise = loadStripe("pk_test_51KhdWJIZblSL4ZcobEoooQQLwvHJWXmplHAi0KFyRLmRKpPvwMOe1exVHNXiDpptBWniMDVf67OoROvcq6IiI8qd00UtDiuA2n")

export default function Payment(){

    const stripe = useStripe()

    // const handleSubmitPayment = async ()=> {

    //    const {error, paymentMethod} = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: Elements.getElement(CardElement)
    //     })
    // }
    return (
        <div>
              <Paper elevation={2} >
                <Elements stripe={stripePromise} >
                        <form> 
                            <CardElement /> 
                                <Button variant="contained"  size='small' color='primary'> Pagar Ahora </Button> 
                        </form>
                </Elements>
            </Paper>
        </div>
    )
}