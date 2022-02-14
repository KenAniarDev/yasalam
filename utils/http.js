import { auth } from '../utils/firebase';

async function getToken() {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    return idToken;
  } catch (error) {
    return error;
  }
}
