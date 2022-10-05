import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import apiService from "../../services/api.service";
import CheckoutForm from "./CheckoutForm";
import "./PaymentBox.css"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
//const stripePromise = loadStripe("pk_test_51IopgfDIO8Hcyk77aq62mcgw2QsmFa3yxE9VSuYQNQ0LcUG4YqVGXRVG2hcwK2l6iwF06XFoOgMmJoDQxMCCee2m003CpMHB9N");
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentBox = (props) => {

    const {reservationData} = props

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
        const fetchData = async () => {
            const data = await apiService.makePayment(reservationData)
            setClientSecret(data.clientSecret)
        }
        fetchData()
    },[])
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };


    return (
      <>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
                )}
      </>
    )
}

export default PaymentBox;


