// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF3T-WABy4CeSgiu2atb_naJJgunCE5Xc",
  authDomain: "used-bike-bazar.firebaseapp.com",
  projectId: "used-bike-bazar",
  storageBucket: "used-bike-bazar.appspot.com",
  messagingSenderId: "745750264942",
  appId: "1:745750264942:web:fcfdca044d84ab80b0ba7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
