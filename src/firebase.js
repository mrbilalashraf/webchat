import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

 const firebaseConfig = {
        
            apiKey: "AIzaSyCKg2aeuvOd2XGR6Cg2Cr5lr84tsKamQ_Y",
            authDomain: "webchat-3c261.firebaseapp.com",
            projectId: "webchat-3c261",
            storageBucket: "webchat-3c261.appspot.com",
            messagingSenderId: "404439160110",
            appId: "1:404439160110:web:e43602c74adc8c3e73d6bf",
            measurementId: "G-98E674SVPL"
      };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;