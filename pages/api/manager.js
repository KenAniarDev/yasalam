import { getAllUsers } from '../../utils/firebaseAdmin';

export default async function handler(req, res) {
  getAllUsers(req, res);
}
