
const express = require("express")
const app = express()
require("dotenv").config()
const Stripe = require("stripe")
const stripe = Stripe('sk_test_51MxhgKCjB4CTACXSw9UcUNGDyLg3RdsTAegvaZStDaZPctMEEIzVi8CySisZ4Hq9glhubj4APJoBe1BoiNjxig1H00WfZaeua4')
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Scrumptious Solar Services",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(process.env.PORT || 4000, () => {
	console.log("Server is listening on port 4000")
})