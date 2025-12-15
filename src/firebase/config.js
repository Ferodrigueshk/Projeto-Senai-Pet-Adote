
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyBAPWH84VwvmJOANOpX9s-Yzgx1nfQPbXs",
  authDomain: "miniblog-5c822.firebaseapp.com",
  projectId: "miniblog-5c822",
  storageBucket: "miniblog-5c822.firebasestorage.app",
  messagingSenderId: "605122934770",
  appId: "1:605122934770:web:cbc689871acb59dfd11d6b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app); 

export { db, storage  };