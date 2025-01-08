// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF0j10jI-jMYH4Hg9vDayUxHh9R4mgo3c",
  authDomain: "unipro-f16c2.firebaseapp.com",
  projectId: "unipro-f16c2",
  storageBucket: "unipro-f16c2.firebasestorage.app",
  messagingSenderId: "375070871575",
  appId: "1:375070871575:web:52c85921ef7073bbbbcc52",
  measurementId: "G-LQ7295SQ7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);