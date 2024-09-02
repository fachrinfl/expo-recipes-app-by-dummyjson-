import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAclOm1IkWTJbS6mHIPhOeOwVBLpGneeJE",
    authDomain: "expo-rn-recipes-app.firebaseapp.com",
    projectId: "expo-rn-recipes-app",
    storageBucket: "expo-rn-recipes-app.appspot.com",
    messagingSenderId: "224308199361",
    appId: "1:224308199361:web:3b8bd82f018e2b10b8b940",
    measurementId: "G-11MH98DK2L"
  };

const app = initializeApp(firebaseConfig);

export default app;