import { checkIfMemberExist } from '../../utils/firebaseAdmin';

export default async function handler(req, res) {
  checkIfMemberExist(req, res);
}
