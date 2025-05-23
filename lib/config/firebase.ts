// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const firebaseConfig ={
  apiKey: "AIzaSyAq8bimIuLBumhJN8abBWkpNBe28WtAG7k",
  authDomain: "enatega-multivender-web.firebaseapp.com",
  projectId: "enatega-multivender-web",
  storageBucket: "enatega-multivender-web.firebasestorage.app",
  messagingSenderId: "438532750182",
  appId: "1:438532750182:web:444c52fcc26e9bb4f0a6a7",
  measurementId: "G-J0JF7CFLQ9",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
