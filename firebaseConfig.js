// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAHeVv95SYCi_AdvqN17mK_5JOSBfyXAg",
  authDomain: "viapp-5287f.firebaseapp.com",
  projectId: "viapp-5287f",
  storageBucket: "viapp-5287f.appspot.com",
  messagingSenderId: "936774352967",
  appId: "1:936774352967:web:4779b33f526f6f43da7162",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
