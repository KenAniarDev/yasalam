const admin = require('firebase-admin');
import { getAuth } from 'firebase-admin/auth';
const serviceAccount = require('../../ServiceAccountKey.json');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

const getAllUsers = async () => {
  const maxResults = 2; // optional arg.

  auth
    .listUsers(maxResults)
    .then((userRecords) => {
      console.log(userRecords.users);
    })
    .catch((error) => console.log(error));
};

export default async function handler(req, res) {
  // db.collection('features')
  //   .get()
  //   .then((snapshot) =>
  //     snapshot.docs.forEach((doc) => console.log(doc.data()))
  //   );

  // const user = await auth.getUserByEmail('goldgyms@gmail.com');

  // await auth.setCustomUserClaims(user.uid, {
  //   manager: false,
  //   outlet: 'e2f7d5c0-87eb-11ec-b6f8-dbc87dcb7fcf',
  // });

  // console.log(users);

  // idToken comes from the client app

  try {
    const decodedToken = await getAuth().verifyIdToken(req.body.idToken);
    const maxResults = 2; // optional arg.

    const user = await getAuth().getUser(decodedToken.uid);

    if (!user.customClaims.admin) {
      throw new Error('Unauthorize');
    }

    const users = await auth.listUsers(maxResults);
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
