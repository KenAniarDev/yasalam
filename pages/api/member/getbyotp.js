import { getMemberByEmailOTP } from 'utils/firebaseAdmin';

export default async function handler(req, res) {
  getMemberByEmailOTP(req, res);
}
