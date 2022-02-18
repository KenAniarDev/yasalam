import { resendPaymentEmail } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  console.log('resending');
  resendPaymentEmail(req, res);
}
