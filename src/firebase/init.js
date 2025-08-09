import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC1b_nKiv_1Oda9aqszpbj1joXqfEz3Yj4",
    authDomain: "week-7-zhao-tingting.firebaseapp.com",
    projectId: "week-7-zhao-tingting",
    storageBucket: "week-7-zhao-tingting.firebasestorage.app",
    messagingSenderId: "529836842050",
    appId: "1:529836842050:web:bbc9ef6f09e00ac9aee1db"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
export default db;