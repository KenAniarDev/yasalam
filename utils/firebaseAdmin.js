import admin from 'firebase-admin';
import { getAuth, doc } from 'firebase-admin/auth';
import { collection } from 'firebase/firestore';
import { generateRandomStrings } from '../utils/functionHelpers';
import { mailHelper } from '../utils/emailHelper';
import moment from 'moment';
import { async } from '@firebase/util';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: 'service_account',
      project_id: 'yasalam-55cc7',
      private_key_id: '96390aff13039b927293d34d67aff21bd8a806b1',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCoJPfZlAf3SnSm\nemBQoCt5Ix1S1qKEGQY8Nudm+h4eN/VN5nN2koQA5kmD9abTiIkzC0hyiAHyOUzp\nMW7aJsVyatUyGkJ55z75uyDnlO97HuzzwsjUhM77JTwreThWsqoJBDc+yQqH4f1y\nS8hwW8twFY4Ag/mYPKooyJlIB1Ptasz0ueYYySXdOsX8U0zYs58FLRED2V9w9WSn\nK3rguU0qheK88MwTAHxUE/BHxb6mUROR1a7N8KgWetCSUtG9vMG7woExdhcGAa9C\nI/pdw1NPVuGs4HtrDh2YeSzjMWbXjeZACRPWS09zCiJkDJem2hN8Vt9cwSVRTTJ+\nkz7YIGuRAgMBAAECggEAAI+DsWIlb82QJKSzgBTqj8ocpxiKPlS26VhO96Awe48Z\n/qtZg/XNYyRUnZNairEqwhqMCgjzQpxjxZf7iVZjQ25iB22W3EIyQTfBxfDSk4g1\nAn9dViAWpcsJu+gFo1Xtlb58ZEjLGjL8fIJbP7yvnNV3oWPeMCX0h+5jL60pz7vf\nQqOhvMB6aYv27u6BvOfMp1a682jdZb405HVKbRGnXaj7T2UklzhbLg+n7dzd03Fz\nHAWy5DbTAbfk9SUj57Ax5dEsD1YyDxG3QN0M7cj1N87XR+lzBt5adrjdhxKjAIoZ\n8oI33Fpg0EtxqPvcRLwnjifynACw5CTqiG5X64FpgQKBgQDXGYr4vDI4eK9R9FCD\nTE2oVcAUl3XLu3RVo8hOC5+rTsEht5fp2GtaGPW4yz2PElt8Vin4w1BkSJvZRnoC\nKXs3jiLKasBpjO4Ec4CH5iAIOSJbdPNKE14cNDhk98JwIZjfNTNTawc3wfFlWrAP\nFy+Co8/sh21ImdrH5h358tcZEQKBgQDIHcTU+3IRlypgC5OKTT1GHnpv/Uh/9BUe\nEg6b2tSYBnJzG3UlTqof9c4Taw+HZxOV6K1tko60luCrKgx39+uegFDWoOtLHANN\nQmrjI4cI32SbcM58TJratCgKd0bToTD5sZ+qELlOc7haluGyrklWzhEsuEL7zkob\nGwqUNaAqgQKBgQDDsVFmCpIGHoYioYu+aGUeiSU/lqxsthaY83EA0EJrsDK1Yjqr\nXWINjje/7+gJikIBVMLKt6ckFYr0mdHWtbaMTJwKXCTB4p2JHywId60czh4b5sKQ\n2h38uuWztlUHfwl9yQDxG6Zta90awO78S7PFvxMjtfIO4yrQQuNyyyQ2gQKBgQCO\ncrpZDX/+S4erhLIKob67OhjXvQkto9agaCQkB1qLuRMhIut5mgx54aRGqFAOh24m\nqNFDDS8uF7Rnwu/LOhxr4FUq4rN67L7g8SVa+EA4LaTVDTC+xFz6z4EtKgitvrE5\nHJpWGb9+u9sACSUx5uRnuRn6plNwIUEZGF+obp/LgQKBgDaVNbSYLqzVM3YU/f//\nWY49DHj8xy5zqLA2GAMqAfPktOcaq7ECdJCOsz10DMqSyc2iErDuUKke/zsLilj4\n9wPqPAREQZlPinggvyVnyjQ5H2RPI5qyAgDmKUsUaFyaAZ0V1qDYEnmHH9xP0vj4\nf4vpD7O2bd1hs8q6l0uFIWRt\n-----END PRIVATE KEY-----\n',
      client_email:
        'firebase-adminsdk-ft3w2@yasalam-55cc7.iam.gserviceaccount.com',
      client_id: '113563829203742302974',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ft3w2%40yasalam-55cc7.iam.gserviceaccount.com',
    }),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

// admins

export const createUserAdmin = async (req, res) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(req.body.idToken);
    const user = await getAuth().getUser(decodedToken.uid);

    if (!user.customClaims.admin) {
      throw new Error('Unauthorize');
    }

    const userRecord = await getAuth().createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: true,
      disabled: false,
    });

    await auth.setCustomUserClaims(userRecord.uid, {
      admin: true,
    });

    res.status(200).send(true);
  } catch (error) {
    res.status(400).send('ERROR');
  }
};
export const changePasswordAdmin = async (req, res) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(req.body.idToken);
    const user = await getAuth().getUser(decodedToken.uid);

    if (!user.customClaims.admin) {
      throw new Error('Unauthorize');
    }

    await getAuth().updateUser(user.uid, {
      password: req.body.password,
    });

    res.status(200).send(true);
  } catch (error) {
    res.status(400).send('ERROR');
  }
};

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
export const createUser = async (req, res) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(req.body.idToken);
    const user = await getAuth().getUser(decodedToken.uid);

    if (!user.customClaims.admin) {
      throw new Error('Unauthorize');
    }

    const userRecord = await getAuth().createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: true,
      disabled: false,
    });

    await auth.setCustomUserClaims(userRecord.uid, {
      manager: true,
      outlet: req.body.outlet,
      outletName: req.body.outletName,
    });

    res.status(200).send(true);
  } catch (error) {
    res.status(400).send('ERROR');
  }
};
export const deleteUser = async (req, res) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(req.body.idToken);
    const user = await getAuth().getUser(decodedToken.uid);

    if (!user.customClaims.admin) {
      throw new Error('Unauthorize');
    }

    await getAuth().deleteUser(req.body.uid);

    res.status(200).send(true);
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
export const changePasswordAUser = async (req, res) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(req.body.idToken);
    const user = await getAuth().getUser(decodedToken.uid);

    if (!user.customClaims.admin) {
      throw new Error('Unauthorize');
    }

    await getAuth().updateUser(req.body.uid, {
      password: req.body.password,
    });

    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(400).send('ERROR');
  }
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

    const otp = generateRandomStrings(6, 'otp');

    const year = moment(date).format('YYYY');
    const month = moment(date).format('MM');
    const day = moment(date).format('DD');

    const issueDate = moment(date).format('YYYY-MM-DD');
    const expiryDate = moment(date).format('YYYY-MM-DD');

    //   const expiryDate = new Date(2022, 0, 3)
    // const currentDate = new Date()
    // console.log(currentDate > expiryDate)

    const name = firstname + ' ' + middlename + ' ' + lastname;

    const docRef = await db.collection('members').add({
      name,
      email,
      mobileNumber,
      birthdate: moment(birthdate).format('YYYY-MM-DD'),
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
      favorites: [],
      isSecondaryActive: false,
      points: 0,
      savings: 0,
      isActivate: false,
      isPaid: false,
      notificationToken: '',
      createdAt: date,
      year,
      month,
      day,
    });

    const link = `${req.headers.origin}/api/payment/${docRef.id}`;

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
export const resendPaymentEmail = async (req, res) => {
  try {
    let query = db.collection('members').where('email', '==', req.body.email);
    const querySnapshot = await query.get();
    const member = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };

    const link = `${req.headers.origin}/api/payment/${member.id}`;

    const message = `Hi ${member.name}! Thank you for availing Yasalam Membership.  You may continue to the payment of your membership in this link: ${link}`;
    const htmlMessage = `Dear  ${member.name}!
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
      subject: `Welcome to Yasalam ${member.userType} Membership - Account Activation`,
      text: message,
      html: htmlMessage,
    };
    mailHelper(mailOptions);

    return res.status(201).send(true);
  } catch (error) {
    return res.status(404).send(false);
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

export const checkIfReferralExist = async (id) => {
  try {
    let doc = await db.collection('referrals').doc(id).get();
    if (doc.exists) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const deleteReferral = async (id) => {
  try {
    await db.collection('referrals').doc(id).delete();
  } catch (error) {
    return new Error('Error Deleting Referral');
  }
};

// transactions

export const addRegisterTransaction = async (member) => {
  const date = new Date();
  const year = moment(date).format('YYYY');
  const month = moment(date).format('MM');
  const day = moment(date).format('DD');
  await db.collection('registerTransactions').add({
    name: member.name,
    userType: member.userType,
    amountPaid: member.amountPaid,
    createdAt: date,
    year,
    month,
    day,
  });
};
