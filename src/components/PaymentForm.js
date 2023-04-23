import React, {useState} from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from 'axios'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

function showErrorAlert(spanishTranslation){
    let msg;
    if(!spanishTranslation){
        msg = "Your payment did not go through, please try again."
    }else{
        msg = "Su pago no se realizó, intente nuevamente"
    }
    alert(msg);
}

export default function PaymentForm(props){
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const spanishTranslation = props.spaTranslation;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error){
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 2000000,
                    id
                })
                if (response.data.success){
                    console.log("Successful payment")
                    setSuccess(true)
                }
            } catch (error) {
                console.log("Error", error)
            }
        }
        else {
            console.log(error.message)
            showErrorAlert(spanishTranslation)
        }
    }

    return(
        <>
        {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>{!spanishTranslation ? "Pay":"Pagar"}</button>
        </form>
        :
        <div>
           <h6>{!spanishTranslation ? "Your payment has successfully gone through. Scrumptious Solar Services will begin the project.":
                "Su pago se ha realizado con éxito. Scrumptious Servicios Solares comenzará el proyecto."}
            </h6>
        </div>
       }
        </>
    )
}