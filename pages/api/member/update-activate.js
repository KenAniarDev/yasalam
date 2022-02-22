import { updateActivate } from 'utils/firebaseAdmin';

export default async function handler(req, res) {
  updateActivate(req, res);
}
