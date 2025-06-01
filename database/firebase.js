// firebase.js
import firebase from "firebase/compat/app"; // Importa Firebase App
import "firebase/compat/firestore"; // Importa Firestore
import "firebase/compat/auth"; // Importa el módulo de autenticación
import "firebase/compat/storage"; // Importa Firebase Storage


// Configuración de Firebase
const firebaseConfig = {
  //apiKey: "AIzaSyCR5_A2WTF1YKlSNvFkMKVNXPzbefxEzDQ",
  //authDomain: "appmovilcs.firebaseapp.com",
  //projectId: "appmovilcs",
  //storageBucket: "appmovilcs.firebasestorage.app",
  //messagingSenderId: "250369424023",
  //appId: "1:250369424023:web:75b223f565aa22aa0007d2",
  //measurementId: 'your-measurement-id'
   
  apiKey: "AIzaSyB3Q9ary2kqMwLd3018eDC_xZjOepKzTeo",
  authDomain: "coldservice-3214d.firebaseapp.com",
  projectId: "coldservice-3214d",
  storageBucket: "coldservice-3214d.firebasestorage.com",
  messagingSenderId: "1083273105380",
  appId: "1:1083273105380:web:9f059bb2f0ea97772001f1",
  measurementId: 'your-measurement-id'
};

// Inicializa Firebase solo si no está ya inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Obtén las instancias de Firestore, Auth y Storage
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Exporta las instancias necesarias
export default { firebase, db, auth, storage }; // Exportación nombrada