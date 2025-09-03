import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBn0r3XU3M1a-rt9jY3xHNBh2kh-Mrtkfs",
    authDomain: "elolamspecialhome-9051b.firebaseapp.com",
    projectId: "elolamspecialhome-9051b",
    storageBucket: "elolamspecialhome-9051b.firebasestorage.app",
    messagingSenderId: "200630545533",
    appId: "1:200630545533:web:9aec7b0b934dca46ea9514",
    measurementId: "G-YP14Z4BR1W"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);