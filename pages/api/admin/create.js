import { createUserAdmin } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  createUserAdmin(req, res);
}
