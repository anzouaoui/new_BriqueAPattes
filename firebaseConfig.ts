import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuration Firebase
const firebaseConfig = {
  // Remplacez ces valeurs par votre configuration Firebase
  apiKey: "AIzaSyDInB6Q-EWfyd8gHAwnUdgLotYqfKt3ZFY",
  authDomain: "bricapattes.firebaseapp.com",
  projectId: "bricapattes",
  storageBucket: "bricapattes.firebasestorage.app",
  messagingSenderId: "813493023796",
  appId: "1:813493023796:web:a55f1dfe1c1447569f8661"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore(app);
export const FIREBASE_STORAGE = getStorage(app);
