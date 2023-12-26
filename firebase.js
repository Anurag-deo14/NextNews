// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDaTZxO2M69WqhbMhOQ9yS9rnYvVU6cM4A",
    authDomain: "news-51e55.firebaseapp.com",
    projectId: "news-51e55",
    storageBucket: "news-51e55.appspot.com",
    messagingSenderId: "1074414514470",
    appId: "1:1074414514470:web:4d806b2579f9b871af11e7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;