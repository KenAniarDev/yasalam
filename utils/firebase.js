import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { generateRandomStrings } from './functionHelpers';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();

export const storage = getStorage();

export const categoryColRef = collection(db, 'categories');
export const featureColRef = collection(db, 'features');
export const regionColRef = collection(db, 'regions');
export const outletColRef = collection(db, 'outlets');
export const outletgroupColRef = collection(db, 'outletgroup');
export const visitColRef = collection(db, 'visits');
export const transactionColRef = collection(db, 'transactions');
export const memberColRef = collection(db, 'members');
export const referralColRef = collection(db, 'referrals');
export const productColRef = collection(db, 'products');

// AUTH
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return 'Success logging out';
  } catch (error) {
    return 'Error logging out';
  }
};

export const signInUser = async (email, password) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (error) {
    return error.message;
  }
};

// CATEGORIES CRUD
export const addCategory = async (name, image, yasalam, experience, order) => {
  addDoc(categoryColRef, {
    name,
    image,
    yasalam,
    experience,
    order,
  });
};

export const getCategories = async () => {
  const categories = await getDocs(categoryColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });

  return categories;
};

export const updateCategory = async (id, name, image, yasalam, experience) => {
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, {
    name,
    image,
    yasalam,
    experience,
  });
};

export const deleteCategory = async (id) => {
  const docRef = doc(db, 'categories', id);
  await deleteDoc(docRef);
};
// FEATURES CRUD
export const addFeature = async (name, icon, order) => {
  addDoc(featureColRef, {
    name,
    icon,
    order,
  });
};

export const getFeatures = async () => {
  const features = await getDocs(featureColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });
  return features;
};

export const updateFeature = async (id, name, icon) => {
  const docRef = doc(db, 'features', id);
  await updateDoc(docRef, {
    name,
    icon,
  });
};

export const deleteFeature = async (id) => {
  const docRef = doc(db, 'features', id);
  await deleteDoc(docRef);
};
// REGIONS CRUD
export const addRegion = async (name, order) => {
  addDoc(regionColRef, {
    name,
    order,
  });
};

export const getRegions = async () => {
  const region = await getDocs(regionColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });
  return region;
};

export const updateRegion = async (id, name) => {
  const docRef = doc(db, 'regions', id);
  await updateDoc(docRef, {
    name,
  });
};

export const deleteRegion = async (id) => {
  const docRef = doc(db, 'regions', id);
  await deleteDoc(docRef);
};

// OUTLET CRUD
export const getOutlets = async () => {
  const outlet = await getDocs(outletColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });
  return outlet;
};
export const getOutlet = async (id) => {
  const docRef = doc(db, 'outlets', id);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

  return data;
};
export const addOutlet = async (outlet) => {
  addDoc(outletColRef, {
    ...outlet,
    categoryRef: doc(db, 'categories', outlet.categoryRef),
    featureRef: doc(db, 'features', outlet.featureRef),
    regionRef: doc(db, 'regions', outlet.regionRef),
    createdAt: new Date(),
  });
};
export const updateOutlet = async (id, outlet) => {
  const docRef = doc(db, 'outlets', id);
  await updateDoc(
    docRef,
    {
      ...outlet,
      categoryRef: doc(db, 'categories', outlet.categoryRef),
      featureRef: doc(db, 'features', outlet.featureRef),
      regionRef: doc(db, 'regions', outlet.regionRef),
    },
    { merge: true }
  );
};
export const deleteOutlet = async (id) => {
  const docRef = doc(db, 'outlets', id);
  await deleteDoc(docRef);
};
// OUTLET GROUP CRUD
export const getAllOutletGroup = async () => {
  const outletgroup = await getDocs(outletgroupColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });
  return outletgroup;
};
export const addOutletGroup = async (name) => {
  addDoc(outletgroupColRef, {
    name,
  });
};
export const updateOutletGroup = async (id, name) => {
  const docRef = doc(db, 'outletgroup', id);
  await updateDoc(docRef, {
    name,
  });
};
export const deleteOutletGroup = async (id) => {
  const docRef = doc(db, 'outletgroup', id);
  await deleteDoc(docRef);
};
// REFERRAL CRUD
export const addReferral = async (count) => {
  for (let i = 0; i < count; i++) {
    await setDoc(doc(db, 'referrals', generateRandomStrings(10)), {
      available: true,
    });
  }
};
export const getReferrals = async () => {
  const region = await getDocs(referralColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });
  return region;
};
export const updateReferral = async (id, state) => {
  const docRef = doc(db, 'referrals', id);
  await updateDoc(docRef, {
    available: state,
  });
};
export const deleteReferral = async (id) => {
  const docRef = doc(db, 'referrals', id);
  await deleteDoc(docRef);
};

// PRODUCTS CRUD
export const addProduct = async (
  name,
  image,
  description,
  points,
  quantity
) => {
  addDoc(productColRef, {
    name,
    image,
    description,
    points,
    quantity,
    createdAt: new Date(),
  });
};

export const getProducts = async () => {
  const categories = await getDocs(productColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });

  return categories;
};

export const updateProduct = async (
  id,
  name,
  image,
  description,
  points,
  quantity
) => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, {
    name,
    image,
    description,
    points,
    quantity,
  });
};

export const deleteProduct = async (id) => {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
};

export const addVisit = async (member, outlet) => {
  addDoc(visitColRef, {
    name: member.name,
    email: member.email,
    memberId: member.id,
    outlet,
    createdAt: new Date(),
  });
};

export const addTransaction = async (
  member,
  outlet,
  originalPrice,
  discount,
  totalPrice,
  saveMoney,
  paymentDesciption
) => {
  // add transaction
  await addDoc(transactionColRef, {
    name: member.name,
    email: member.email,
    memberId: member.id,
    outlet,
    originalPrice,
    discount,
    totalPrice,
    saveMoney,
    paymentDesciption,
    createdAt: new Date(),
  });
  const points = member.points + Math.floor(totalPrice / 10);
  console.log(saveMoney);
  const savings = member.savings + saveMoney;
  const docRef = doc(db, 'members', member.id);
  await updateDoc(docRef, {
    points,
    savings,
  });
};

export const fileUploader = (folder, file, setUrl) => {
  if (!file) return;

  const storageRef = ref(storage, `${folder}/${Date.now() + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (err) => {
      return err;
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setUrl(url);
      });
    }
  );
};
