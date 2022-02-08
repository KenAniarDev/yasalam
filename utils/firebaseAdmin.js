const admin = require('firebase-admin');
import { async } from '@firebase/util';
import { getAuth } from 'firebase-admin/auth';
const serviceAccount = require('../ServiceAccountKey.json');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

export const getAllUsers = async (req, res) => {
  assignManager();
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
