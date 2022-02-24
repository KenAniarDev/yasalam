import { getMemberInfo } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  getMemberInfo(req, res);
}
