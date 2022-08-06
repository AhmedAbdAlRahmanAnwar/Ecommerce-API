const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (request, response) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: request.body.totalPrice,
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    response.send({
        clientSecret: paymentIntent.client_secret,
    });
}