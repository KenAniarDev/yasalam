import { updateWithReferral } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  updateWithReferral(req, res);
}
