// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg3TtesXiwkPKB1PbIaKNKY-OfesqcyGk",
  authDomain: "viapp-9d2c6.firebaseapp.com",
  projectId: "viapp-9d2c6",
  storageBucket: "viapp-9d2c6.appspot.com",
  messagingSenderId: "995761236397",
  appId: "1:995761236397:web:86fa8bad7762fccfdb1924"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);