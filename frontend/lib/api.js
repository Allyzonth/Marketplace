import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db,} from '@/lib/firebase';

const waitForAuthReady = () =>
  new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, () => {
      unsub();
      resolve();
    });
  });

// Get all products
export const fetchProducts = async () => {
  try {
    const productsQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const productsSnapshot = await getDocs(productsQuery);
    return productsSnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data()
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product by ID
export const fetchProductById = async (id) => {
  try {
    const productSnapshot = await getDoc(doc(db, 'products', id));
    if (!productSnapshot.exists()) {
      throw new Error('Produk tidak ditemukan');
    }
    return {
      id,
      ...productSnapshot.data()
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

const ensureAdmin = async () => {
  await waitForAuthReady();
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Unauthorized: login admin diperlukan');
  }

  const adminSnapshot = await getDoc(doc(db, 'admins', user.uid));
  if (!adminSnapshot.exists()) {
    throw new Error('Akun ini bukan admin');
  }

  return user;
};

export const adminLogin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const adminSnapshot = await getDoc(doc(db, 'admins', userCredential.user.uid));
  if (!adminSnapshot.exists()) {
    await signOut(auth);
    throw new Error('Akun ini bukan admin');
  }
  return userCredential.user;
};

export const adminLogout = async () => signOut(auth);

export const isAdminLoggedIn = async () => {
  try {
    await ensureAdmin();
    return true;
  } catch (_) {
    return false;
  }
};

// Create product (admin)
export const createProduct = async (payload) => {
  try {
    await ensureAdmin();
    const docRef = await addDoc(collection(db, 'products'), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    const createdSnapshot = await getDoc(docRef);
    return {
      id: docRef.id,
      ...createdSnapshot.data()
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product (admin)
export const updateProduct = async (id, payload) => {
  try {
    await ensureAdmin();
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, {
      ...payload,
      updatedAt: serverTimestamp()
    });
    const updatedSnapshot = await getDoc(productRef);
    return {
      id,
      ...updatedSnapshot.data()
    };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product (admin)
export const deleteProduct = async (id) => {
  try {
    await ensureAdmin();
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
