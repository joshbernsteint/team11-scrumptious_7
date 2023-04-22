
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51MxhgKCjB4CTACXS4antoJ5AJH3Pf5YXgOBBK9BTzEHW3rgdoCq7aTdRvTaFUCiMISzCEcM6yZ2jiIwyOQ68YK8M00VAUE4ycY"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(){
    return (
        <div className="App">
            <h1>
                Enter bank card info:
            </h1>
            <Elements stripe={stripeTestPromise}>
                <PaymentForm/>
            </Elements>
        </div>
    )
}