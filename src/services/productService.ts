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
