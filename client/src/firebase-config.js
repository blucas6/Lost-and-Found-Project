import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCHj0N5qk6PscMuGJifDYofpv9P3WTvm7M",
    authDomain: "lost-found-ec15c.firebaseapp.com",
    projectId: "lost-found-ec15c",
    storageBucket: "lost-found-ec15c.appspot.com",
    messagingSenderId: "520187325005",
    appId: "1:520187325005:web:980ed39782f05c22958a04",
    measurementId: "G-5XBD50BTXZ"
  };

  const firebase_app = initializeApp(firebaseConfig)

  export const db = getFirestore(firebase_app)

