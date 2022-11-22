import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
/*   apiKey: process.env.REACT_APP_FIREBASE_APIKEY ,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN ,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID ,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET ,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID ,
  appId: process.env.REACT_APP_FIREBASE_APPID ,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID */

  apiKey: "AIzaSyD1_Z8hj1FLtqHUlFRBFx7OW-oi43eK6ew",
  authDomain: "restaurante-fb8ba.firebaseapp.com",
  projectId: "restaurante-fb8ba",
  storageBucket: "restaurante-fb8ba.appspot.com",
  messagingSenderId: "451138763427",
  appId: "1:451138763427:web:84cce30b161739bf0add16",
  measurementId: "G-2MSV7FC4T0"
};

export default firebaseConfig