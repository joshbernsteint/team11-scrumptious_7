// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd9U9OXSgCjOeEVk3Xnagk8SICaB0AiAY",
  authDomain: "solar-panel-installation-users.firebaseapp.com",
  databaseURL: "https://solar-panel-installation-users-default-rtdb.firebaseio.com",
  projectId: "solar-panel-installation-users",
  storageBucket: "solar-panel-installation-users.appspot.com",
  messagingSenderId: "97732947913",
  appId: "1:97732947913:web:a31721277e9ecdeae94218",
  measurementId: "G-1HQ5KY2CW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const user_database = getDatabase(app);
export const auth = getAuth(app);