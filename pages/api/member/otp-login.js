import { otpLogin } from 'utils/firebaseAdmin';

export default async function handler(req, res) {
  otpLogin(req, res);
}
