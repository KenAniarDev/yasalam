const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    customer_email: req.body.email,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1KRHa7B7lG4J9OJljO72mfDK',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}?canceled=true`,
  });

  res.redirect(303, session.url);
}
