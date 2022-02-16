import {
  getMemberByEmail,
  memberPaid,
  checkIfReferralExist,
  deleteReferral,
} from '../../../utils/firebaseAdmin';

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

    let year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    const issueDate = year + '-' + month + '-' + day;
    year++;
    const expiryDate = year + '-' + month + '-' + day;

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
