import { getMember } from '../../../utils/firebaseAdmin';

export default async function handler(req, res) {
  try {
    const member = await getMember(req.query.id);
    if (!member) return res.status(404).send('User not found');
    return res.send(member);
  } catch (error) {
    return res.status(404).send('User not found');
  }
}
