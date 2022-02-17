import { changePasswordAdmin } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  changePasswordAdmin(req, res);
}
