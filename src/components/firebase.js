// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA82MobCXePwwz_mct9vNV4U1JFNTOrEI",
  authDomain: "time-tracking-e2815.firebaseapp.com",
  projectId: "time-tracking-e2815",
  storageBucket: "time-tracking-e2815.appspot.com",
  messagingSenderId: "432969876974",
  appId: "1:432969876974:web:ee4fdb4cb9b39ea8763aff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 