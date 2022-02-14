const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);
import { connectStorageEmulator } from 'firebase/storage';
import { getMember } from '../../utils/firebaseAdmin';

export default async function handler(req, res) {
  const member = await getMember(req, res);
  const session = await stripe.checkout.sessions.create({
    customer_email: member.email,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price:
          member.userType === 'individual'
            ? 'price_1KRHa7B7lG4J9OJljO72mfDK'
            : 'price_1KSx9FB7lG4J9OJlqDXeO6eI',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.origin}/payment-success`,
    cancel_url: `${req.headers.origin}/payment-canceled`,
  });

  res.redirect(303, session.url);
}
