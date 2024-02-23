import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDzGMH_gEJsi6PAxnGKCf9A1-b4M3pdOA",
  authDomain: "amma-track-app.firebaseapp.com",
  projectId: "amma-track-app",
  storageBucket: "amma-track-app.appspot.com",
  messagingSenderId: "573514537905",
  appId: "1:573514537905:web:f90ca48363ffb910947b90",
  measurementId: "G-VPV0LTZQZL"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db };