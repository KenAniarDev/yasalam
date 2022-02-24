import { addFavorite } from 'utils/firebaseAdmin';

export default async function handler(req, res) {
  addFavorite(req, res);
}
