import { checkEmailLogin } from 'utils/firebaseAdmin';

export default async function handler(req, res) {
  console.log('route hit');
  checkEmailLogin(req, res);
}
