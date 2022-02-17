import Stripe from 'stripe';
import { buffer } from 'micro';
import { memberPaid, addRegisterTransaction } from '../../utils/firebaseAdmin';
import moment from 'moment';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const date = new Date();
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret =
      process.env.NODE_ENV == 'development'
        ? process.env.STRIPE_WEBHOOK_SIGNING_SECRET_LOCAL
        : process.env.STRIPE_WEBHOOK_SIGNING_SECRET_PROD;

    let event;

    try {
      if (!sig || !webhookSecret) return;

      // payment_intent.succeeded
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      if (event.type === 'payment_intent.succeeded') {
        const customer = await stripe.customers.retrieve(
          event.data.object.customer
        );

        const issueDate = moment(date).format('YYYY-MM-DD');
        const expiryDate = moment(date).add(1, 'years').format('YYYY-MM-DD');

        const member = await memberPaid(customer.email, {
          isPaid: true,
          issueDate: issueDate,
          expiryDate: expiryDate,
        });
        await addRegisterTransaction({
          ...member,
          amountPaid: event.data.object.amount_received / 100,
        });
      }
      return res.status(200).send();
    } catch (error) {
      console.log('Webhook Error: ' + error.message);
      return res.status(400).send('Webhook Error: ' + error.message);
    }
  }
  res.status(200).send();
}
