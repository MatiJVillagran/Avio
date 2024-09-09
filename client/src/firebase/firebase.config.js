// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkkol5eKw25ZvRPR9SIfUg1SxRGiuKVFk",
  authDomain: "avio-mercado.firebaseapp.com",
  projectId: "avio-mercado",
  storageBucket: "avio-mercado.appspot.com",
  messagingSenderId: "524669949708",
  appId: "1:524669949708:web:0bb084dc2d739bb82a9b29",
  measurementId: "G-Y3GL19L37E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)