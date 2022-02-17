import { changePasswordAUser } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  changePasswordAUser(req, res);
}
