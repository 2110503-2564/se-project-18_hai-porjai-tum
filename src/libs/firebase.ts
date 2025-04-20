// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1FhuGldQtm6e00qZRnhe26YOYu5maLj0",
  authDomain: "porjai-470fb.firebaseapp.com",
  projectId: "porjai-470fb",
  storageBucket: "porjai-470fb.appspot.com",
  messagingSenderId: "748161485285",
  appId: "1:748161485285:web:74dae774185922cfed870c",
  measurementId: "G-C800YXPNP1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
