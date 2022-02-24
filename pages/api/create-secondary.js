import { addSecondary } from '../../utils/firebaseAdmin';
export default function handler(req, res) {
  addSecondary(req, res);
}
