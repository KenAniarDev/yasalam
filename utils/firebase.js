import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

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

export const storage = getStorage();

export const categoryColRef = collection(db, 'categories');
export const featureColRef = collection(db, 'features');
export const regionColRef = collection(db, 'regions');
export const outletColRef = collection(db, 'outlets');

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

export const fileUploader = (folder, file, setUrl) => {
  if (!file) return;

  const storageRef = ref(storage, `${folder}/${Date.now() + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {},
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
