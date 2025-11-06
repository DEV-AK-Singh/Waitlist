export interface WaitlistEntry {
  email: string;
  phone: string;
  timestamp: Date;
}

export interface FirebaseResponse {
  success: boolean;
  id?: string;
  error?: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}