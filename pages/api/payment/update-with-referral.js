import {
  getMemberByEmail,
  memberPaid,
  checkIfReferralExist,
  deleteReferral,
} from '../../../utils/firebaseAdmin';
import moment from 'moment';

export default async function handler(req, res) {
  const date = new Date();
  console.log(req.body.code);
  try {
    const isReferral = await checkIfReferralExist(req.body.code);

    if (!isReferral) {
      return res.status(400).send('Invalid referral');
    }
    const member = await getMemberByEmail(req.body.email);
    if (!member) {
      return res.status(400).send('User not found');
    }

    if (member.isPaid) {
      return res.status(400).send('User already paid');
    }

    const issueDate = moment(date).format('YYYY-MM-DD');
    const expiryDate = moment(date).add(1, 'years').format('YYYY-MM-DD');

    await memberPaid(member.email, {
      isPaid: true,
      issueDate: issueDate,
      expiryDate: expiryDate,
    });

    await deleteReferral(req.body.code);

    return res.status(200).send('Activated');
  } catch (error) {
    console.log(error);
    return res.status(400).send('Error Please Try Again');
  }
}
