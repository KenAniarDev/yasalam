import { deleteUser } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  deleteUser(req, res);
}
