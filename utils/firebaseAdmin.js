import admin from 'firebase-admin';
import { getAuth, doc } from 'firebase-admin/auth';
import { collection } from 'firebase/firestore';
import serviceAccount from '../ServiceAccountKey.json';
import { generateOTP } from '../utils/functionHelpers';
import { mailHelper } from '../utils/emailHelper';
import { async } from '@firebase/util';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

// managers

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

// members

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
  res.send(true);
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
      createdAt: date,
    });

    const link = `${req.headers.origin}/api/payment/${docRef.id}?name=${name}&type=${userType}`;

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

    return res.status(201).send(true);
  } catch (error) {
    console.log(error);
    return res.send('Error');
  }
};

export const getMember = async (id) => {
  try {
    let doc = await db.collection('members').doc(id).get();
    const member = doc.data();
    delete member.otp;
    console.log(doc.id);
    return { ...member, id: doc.id };
  } catch (error) {
    return null;
  }
};

export const getMemberByEmail = async (email) => {
  try {
    let query = db.collection('members').where('email', '==', email);
    const querySnapshot = await query.get();
    const member = querySnapshot.docs[0].data();

    if (!member) {
      return null;
    }

    return member;
  } catch (error) {
    return null;
  }
};

export const memberPaid = async (email, update) => {
  try {
    let query = db.collection('members').where('email', '==', email);
    const querySnapshot = await query.get();
    const member = querySnapshot.docs[0].data();

    await db.collection('members').doc(querySnapshot.docs[0].id).update(update);

    const message = `Hi ${member.name}! <br />
      Welcome to YaSalam  <br /> <br />

      UAE’s leading lifestyle membership platform. <br/> <br/>

      Your YaSalam account OTP is ${member.otp}<br/>
      Please don’t share your one time password (OTP) with anyone.<br/> <br/>

      Get started and be “YaSalam” in 3 easy steps <br/><br/>
      1-	Download YaSalam App
      2-	Login by using your email and your OTP
      3-	Start Exploring and enjoy.

      <br/><br/>
      Please feel free to contact our support team if you need any help <br/>
       support@yasalamae.ae .

       <br/><br/><br/>
       Stay healthy and YaSalam

       <br/><br/>
      Sincerely,  <br/>
      YaSalam Team`;
    const htmlMessage = `Hi ${member.name}! <br />
      Welcome to YaSalam  <br /> <br />

      UAE’s leading lifestyle membership platform. <br/> <br/>

      Your YaSalam account OTP is ${member.otp}<br/>
      Please don’t share your one time password (OTP) with anyone.<br/> <br/>

      Get started and be “YaSalam” in 3 easy steps <br/><br/>
      1-	Download YaSalam App
      2-	Login by using your email and your OTP
      3-	Start Exploring and enjoy.

      <br/><br/>
      Please feel free to contact our support team if you need any help <br/>
       support@yasalamae.ae .

       <br/><br/><br/>
       Stay healthy and YaSalam

       <br/><br/>
      Sincerely,  <br/>
      YaSalam Team`;
    const mailOptions = {
      from: 'confirmation@yasalamae.ae',
      to: email,
      subject: `Welcome to Yasalam ${member.userType} Membership - Account Activation`,
      text: message,
      html: htmlMessage,
    };
    mailHelper(mailOptions);

    return member;
  } catch (error) {
    console.log(error);
    return new Error('error updating user');
  }
};
export const checkIfReferralExist = async (referral) => {
  try {
    let doc = await db.collection('referrals').doc(referral).get();
    if (doc.exists) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// transactions

export const addRegisterTransaction = async (member) => {
  await db.collection('registerTransactions').add({
    name: member.name,
    userType: member.userType,
    amountPaid: member.amountPaid,
    createdAt: new Date(),
  });
};

// visits
