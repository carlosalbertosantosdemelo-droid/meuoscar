import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZnfJcM__xVmnfpvnO5gTpXTIxaT_huVA",
  authDomain: "meuoscar2026.firebaseapp.com",
  projectId: "meuoscar2026",
  storageBucket: "meuoscar2026.firebasestorage.app",
  messagingSenderId: "1022175050773",
  appId: "1:1022175050773:web:8433699dcc6afce869221c"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
