import { deleteFavorite } from 'utils/firebaseAdmin';

export default async function handler(req, res) {
  deleteFavorite(req, res);
}
