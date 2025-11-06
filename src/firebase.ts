import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import type { WaitlistEntry, FirebaseResponse } from './types';

// Firebase configuration from environment variables
const firebaseConfig = { 
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate environment variables
const validateFirebaseConfig = (config: typeof firebaseConfig): void => {
  const missingVars: string[] = [];
  
  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      missingVars.push(key);
    }
  });

  if (missingVars.length > 0) {
    throw new Error(`Missing Firebase environment variables: ${missingVars.join(', ')}`);
  }
};

// Initialize Firebase
let app;
try {
  validateFirebaseConfig(firebaseConfig);
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

export const db = getFirestore(app);

// Function to add waitlist entry
export const addToWaitlist = async (email: string, phone: string): Promise<FirebaseResponse> => {
  try {
    const waitlistEntry: WaitlistEntry = {
      email,
      phone,
      timestamp: new Date()
    };

    const docRef = await addDoc(collection(db, 'waitlist'), waitlistEntry);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};