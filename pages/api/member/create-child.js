import { addChild } from 'utils/firebaseAdmin';

export default async function handler(req, res) {
  addChild(req, res);
}
