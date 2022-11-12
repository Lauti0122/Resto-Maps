import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBV4vuyvPwG3k958B91LSV7r7K_7x9j_RE",
  authDomain: "restoapp-7ced8.firebaseapp.com",
  projectId: "restoapp-7ced8",
  storageBucket: "restoapp-7ced8.appspot.com",
  messagingSenderId: "882039195134",
  appId: "1:882039195134:web:7a8333b653ddd0336aacaf"
};



export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase)