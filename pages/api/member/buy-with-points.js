import { buyWithPoints } from 'utils/firebaseAdmin';

export default async function handler(req, res) {
  buyWithPoints(req, res);
}
