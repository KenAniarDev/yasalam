import { addMember } from '../../utils/firebaseAdmin';
export default function handler(req, res) {
  addMember(req, res);
}
