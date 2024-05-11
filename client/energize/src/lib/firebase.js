import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBayChLHTAdrwJv8Fs5nAW4hkII0omPl7Q",
  authDomain: "pafapp-9c79d.firebaseapp.com",
  projectId: "pafapp-9c79d",
  storageBucket: "pafapp-9c79d.appspot.com",
  messagingSenderId: "159733817947",
  appId: "1:159733817947:web:82dad4a7e854073371d57e",
  measurementId: "G-K1XTRGEJ75"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()