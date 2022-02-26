const stripe = require('stripe')(
  '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'
);
import { getMember } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  const protocol =
    req.headers.host === 'localhost:3000' ? 'http://' : 'https://';
  const { id } = req.query;
  const member = await getMember(id);
  if (!member) {
    return res.redirect(
      303,
      `${protocol + req.headers.host}/error-page?error=user not found`
    );
  }
  if (member.userType === 'secondary') {
    return res.redirect(
      303,
      `${protocol + req.headers.host}/error-page?error=user is secondary`
    );
  }
  if (member.isPaid) {
    return res.redirect(
      303,
      `${protocol + req.headers.host}/error-page?error=user already paid`
    );
  }
  const session = await stripe.checkout.sessions.create({
    customer_email: member.email,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price:
          member.userType === 'individual'
            ? 'price_1KXESmIiGYm0gLPFfd0DpQSn'
            : 'price_1KXERzIiGYm0gLPFIZXTjuji',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${protocol + req.headers.host}/payment-success`,
    cancel_url: `${protocol + req.headers.host}/payment-canceled`,
  });

  res.redirect(303, session.url);
}
