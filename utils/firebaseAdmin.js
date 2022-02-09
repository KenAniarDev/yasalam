import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { collection } from 'firebase/firestore';
import serviceAccount from '../ServiceAccountKey.json';
import { generateOTP } from '../utils/functionHelpers';
import { mailHelper } from '../utils/emailHelper';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

export const getAllUsers = async (req, res) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(req.body.idToken);
    const maxResults = 1000; // optional arg.

    const user = await getAuth().getUser(decodedToken.uid);

    if (!user.customClaims.admin) {
      throw new Error('Unauthorize');
    }

    const users = await auth.listUsers(maxResults);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send('ERROR');
  }
};

export const assignManager = async () => {
  const user = await auth.getUserByEmail('goldgyms@gmail.com');

  await auth.setCustomUserClaims(user.uid, {
    manager: true,
    outlet: 'e2f7d5c0-87eb-11ec-b6f8-dbc87dcb7fcf',
    outletName: 'Gold Gyms',
  });
};

export const checkIfMemberExist = async (req, res) => {
  try {
    let count = 0;
    let query = db.collection('members').where('email', '==', req.query.email);
    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      count++;
    });
    if (count > 0) return res.send(true);
    return res.send(false);
  } catch (error) {
    res.send(true);
  }
};
export const addMember = async (req, res) => {
  try {
    const date = new Date();

    const {
      firstname,
      middlename,
      lastname,
      email,
      mobileNumber,
      birthdate,
      nationality,
      gender,
      employerDetails,
      frontimageID,
      backimageID,
      userType,
    } = req.body;

    const otp = generateOTP(6);

    let year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    const issueDate = year + '-' + month + '-' + day;
    year++;
    const expiryDate = year + '-' + month + '-' + day;

    //   const expiryDate = new Date(2022, 0, 3)
    // const currentDate = new Date()
    // console.log(currentDate > expiryDate)

    const name = firstname + ' ' + middlename + ' ' + lastname;

    const docRef = await db.collection('members').add({
      name,
      email,
      mobileNumber,
      birthdate,
      nationality,
      gender,
      employerDetails,
      frontimageID,
      backimageID,
      userType,
      otp,
      issueDate,
      expiryDate,
      children: [],
      isSecondaryActive: false,
      points: 0,
      savings: 0,
      isActivate: false,
      isPaid: false,
      notificationToken: '',
    });

    const link = `${req.headers.origin}/${docRef.id}`;

    const message = `Hi ${name}! Thank you for availing Yasalam Membership.  You may continue to the payment of your membership in this link: ${link}`;
    const htmlMessage = `Dear  ${name}!
   <br /> <br />
   Your one click away!!!
   Your Yasalam Membership registration is complete.<br>
   Please click on the link below to proceed and make your membership payment.<br><br>

   <a href="${link}"> ${link}</a>
 
   <br><br>

   Feel free to contact our team if you need any help or support. <br/>
   support@yasalamae.ae.

   <br><br>

   Sincerely, 
   <br>
   Yasalam Team`;

    const mailOptions = {
      from: 'confirmation@yasalamae.ae',
      to: req.body.email,
      subject: `Welcome to Yasalam ${userType} Membership - Account Activation`,
      text: message,
      html: htmlMessage,
    };
    mailHelper(mailOptions);
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
};
