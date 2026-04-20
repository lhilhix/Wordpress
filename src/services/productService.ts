import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Product {
  id: string; // The reference ID like PB-001
  firestoreId?: string; // The Firestore auto-generated ID
  name: string;
  category: string;
  description: string;
  image: string;
  detailedDescription?: string;
  specifications?: string;
  createdAt?: any;
  updatedAt?: any;
}

const PRODUCTS_COLLECTION = 'products';

export const getProducts = async (): Promise<Product[]> => {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('id', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    firestoreId: doc.id
  } as Product));
};

export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('id', 'asc'));
  return onSnapshot(q, (querySnapshot) => {
    const products = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      firestoreId: doc.id
    } as Product));
    callback(products);
  });
};

export const addProduct = async (product: Omit<Product, 'firestoreId'>) => {
  return await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...product,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
};

export const updateProduct = async (firestoreId: string, product: Partial<Product>) => {
  const productRef = doc(db, PRODUCTS_COLLECTION, firestoreId);
  return await updateDoc(productRef, {
    ...product,
    updatedAt: Timestamp.now()
  });
};

export const deleteProduct = async (firestoreId: string) => {
  const productRef = doc(db, PRODUCTS_COLLECTION, firestoreId);
  return await deleteDoc(productRef);
};

// Site Settings
export interface SiteSettings {
  heroImage?: string;
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  aboutText?: string;
  aboutImage?: string;
  servicesIntro?: string;
}

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  const docRef = doc(db, 'settings', 'site');
  const docSnap = await getDocs(query(collection(db, 'settings')));
  const siteDoc = docSnap.docs.find(d => d.id === 'site');
  return siteDoc ? (siteDoc.data() as SiteSettings) : null;
};

export const subscribeToSiteSettings = (callback: (settings: SiteSettings) => void) => {
  return onSnapshot(doc(db, 'settings', 'site'), (doc) => {
    if (doc.exists()) {
      callback(doc.data() as SiteSettings);
    }
  });
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
  const docRef = doc(db, 'settings', 'site');
  // Use setDoc with merge instead of updateDoc in case the document doesn't exist yet
  const { setDoc } = await import('firebase/firestore');
  return await setDoc(docRef, settings, { merge: true });
};
