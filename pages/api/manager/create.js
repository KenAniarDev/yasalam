import { createUser } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  createUser(req, res);
}
