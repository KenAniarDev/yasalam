import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('called');
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret =
      process.env.NODE_ENV == 'development'
        ? process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SIGNING_SECRET_LOCAL
        : process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SIGNING_SECRET_PROD;

    let event;

    try {
      if (!sig || !webhookSecret) return;

      // payment_intent.succeeded
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      if (event.type === 'payment_intent.succeeded') {
        const bufObj = JSON.parse(buf);
        // console.log('buf', buf);
        // console.log('bufObj', bufObj);
        const customer = await stripe.customers.retrieve(
          event.data.object.customer
        );

        console.log(customer.email);
      }
    } catch (error) {
      console.log('Webhook Error: ' + error.message);
      return res.status(400).send('Webhook Error: ' + error.message);
    }
  }
  res.status(200).send();
}
