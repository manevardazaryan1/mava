import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA68vv5ofyQiZw9pWODQ3X9tn-7vl1Wcc0",
  authDomain: "mava-project.firebaseapp.com",
  projectId: "mava-project",
  storageBucket: "mava-project.appspot.com",
  messagingSenderId: "908117238251",
  appId: "1:908117238251:web:0fef3eddc676b7281cf9ae",
  measurementId: "G-F01SHCSGDJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };