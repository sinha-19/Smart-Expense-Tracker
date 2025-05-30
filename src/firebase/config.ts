import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDyzLSvB4KJCm1okjCTYc88e7G4Yb30mX0",
  authDomain: "smart-expense-tracker-db09c.firebaseapp.com",
  projectId: "smart-expense-tracker-db09c",
  storageBucket: "smart-expense-tracker-db09c.firebasestorage.app",
  messagingSenderId: "421962475025",
  appId: "1:421962475025:web:dd5792bb3d599bb8c333b0",
  measurementId: "G-GGWDM76R56"
};
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; 
}
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;