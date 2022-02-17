import {
  getMemberByEmail,
  memberPaid,
  checkIfReferralExist,
  deleteReferral,
} from '../../../utils/firebaseAdmin';
import moment from 'moment';

export default async function handler(req, res) {
  const date = new Date();
  try {
    const isReferral = await checkIfReferralExist(req.body.code);

    if (!isReferral) {
      return res.redirect(
        303,
        `${req.headers.origin}/error-page?error=referral not exist`
      );
    }
    const member = await getMemberByEmail(req.body.email);
    if (!member) {
      return res.redirect(
        303,
        `${req.headers.origin}/error-page?error=user not found`
      );
    }

    if (member.isPaid) {
      return res.redirect(
        303,
        `${req.headers.origin}/error-page?error=user already paid`
      );
    }

    const issueDate = moment(date).format('YYYY-MM-DD');
    const expiryDate = moment(date).add(1, 'years').format('YYYY-MM-DD');

    await memberPaid(member.email, {
      isPaid: true,
      issueDate: issueDate,
      expiryDate: expiryDate,
    });

    await deleteReferral(req.body.code);

    return res.redirect(303, `${req.headers.origin}/payment-success`);
  } catch (error) {
    console.log(error);
    return res.redirect(
      303,
      `${req.headers.origin}/error-page?error=user not found`
    );
  }
}
