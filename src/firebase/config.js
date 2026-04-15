import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBCnaC7Q8EcASXbd3LYb5ycE7twOGVJeOI",
  authDomain: "krishna-e9c59.firebaseapp.com",
  projectId: "krishna-e9c59",
  storageBucket: "krishna-e9c59.firebasestorage.app",
  messagingSenderId: "1048468387337",
  appId: "1:1048468387337:web:2526130e3fa2ab75b02ad8",
};

const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
