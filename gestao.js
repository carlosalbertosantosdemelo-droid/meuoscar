import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 PROTEÇÃO DO PAINEL
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const snap = await getDoc(doc(db, "usuarios", user.uid));
  if (!snap.exists() || snap.data().perfil !== "gestao") {
    alert("Acesso restrito à gestão");
    window.location.href = "dashboard.html";
  }
});

// 📢 PUBLICAR AVISO
window.publicarAviso = async function () {
  const titulo = document.getElementById("titulo").value;
  const texto = document.getElementById("texto").value;

  if (!titulo || !texto) {
    alert("Preencha todos os campos");
    return;
  }

  await addDoc(collection(db, "avisos"), {
    titulo,
    texto,
    data: serverTimestamp(),
    publico: "todos"
  });

  alert("Aviso publicado!");
  document.getElementById("titulo").value = "";
  document.getElementById("texto").value = "";
};

// 🚪 LOGOUT
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
