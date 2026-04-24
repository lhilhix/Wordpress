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
  industry: string;
  description: string;
  image: string;
  isFeatured?: boolean;
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
  return onSnapshot(q, 
    (querySnapshot) => {
      const products = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        firestoreId: doc.id
      } as Product));
      callback(products);
    },
    (error) => {
      console.error("Error subscribing to products:", error);
    }
  );
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
  techCatalogUrl?: string;
}

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  const docRef = doc(db, 'settings', 'site');
  const docSnap = await getDocs(query(collection(db, 'settings')));
  const siteDoc = docSnap.docs.find(d => d.id === 'site');
  return siteDoc ? (siteDoc.data() as SiteSettings) : null;
};

export const subscribeToSiteSettings = (callback: (settings: SiteSettings) => void) => {
  return onSnapshot(doc(db, 'settings', 'site'), 
    (doc) => {
      if (doc.exists()) {
        callback(doc.data() as SiteSettings);
      } else {
        const defaultSettings: SiteSettings = {
          heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
          contactEmail: "geral@bueso.pt",
          contactPhone: "+351 253 695 164",
          address: "R. António Alberto de Sousa 38 Pav.2, 4705-132 Braga, Portugal",
          aboutText: "Fundada com a missão de transformar materiais, a Plásticos Bueso é sinónimo de inovação na indústria de plásticos. Com anos de experiência, a nossa jornada é marcada pela qualidade e pela procura constante por soluções eficientes. O nosso compromisso com a sustentabilidade e a resiliência reflete-se em cada etapa do nosso processo produtivo.",
          servicesIntro: "Especializamo-nos em soluções inovadoras para a indústria de transformação de plásticos. Os nossos serviços abrangem injeção, cromagem e metalização a vácuo, respondendo aos mais altos padrões de exigência do setor automóvel, médico e eletrónico.",
        };
        callback(defaultSettings);
      }
    },
    (error) => {
      console.error("Error subscribing to site settings:", error);
    }
  );
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
  const docRef = doc(db, 'settings', 'site');
  // Use setDoc with merge instead of updateDoc in case the document doesn't exist yet
  const { setDoc } = await import('firebase/firestore');
  return await setDoc(docRef, settings, { merge: true });
};
