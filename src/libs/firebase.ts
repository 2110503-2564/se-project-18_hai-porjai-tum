// Import Firebase core and Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ This is the one you're missing

// Optional: Analytics (only works in browser)
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB1FhuGldQtm6e00qZRnhe26YOYu5maLj0",
  authDomain: "porjai-470fb.firebaseapp.com",
  projectId: "porjai-470fb",
  storageBucket: "porjai-470fb.firebasestorage.app",
  messagingSenderId: "748161485285",
  appId: "1:748161485285:web:74dae774185922cfed870c",
  measurementId: "G-C800YXPNP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Optional: Analytics
// const analytics = getAnalytics(app);

export { db };
