// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACorDVVHTp7bjJxw5MSZ9tN3iU4I1VhqY",
  authDomain: "mighty-url-shortner.firebaseapp.com",
  projectId: "mighty-url-shortner",
  storageBucket: "mighty-url-shortner.appspot.com",
  messagingSenderId: "1090035289159",
  appId: "1:1090035289159:web:f83180159019e380267562",
  measurementId: "G-DL67LYJFPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default firebaseConfig