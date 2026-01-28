import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { collection, query, where, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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

// 🔐 VERIFICA LOGIN
onAuthStateChanged(auth, async (user) => {
if (!user) {
  window.location.href = "index.html";
  return;
}

const docRef = doc(db, "usuarios", user.uid);
const docSnap = await getDoc(docRef);

if (!docSnap.exists()) return;

const dados = docSnap.data();

// 👤 DADOS DO USUÁRIO
document.getElementById("email").textContent = dados.email;
document.getElementById("perfil").textContent = dados.perfil;
document.getElementById("turma").textContent = dados.turma || "-";
document.getElementById("turno").textContent = dados.turno;

// 📅 HORÁRIO
const q = query(
  collection(db, "horarios"),
  where("turma", "==", dados.turma),
  where("turno", "==", dados.turno)
);

const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
  const h = doc.data();
  document.getElementById("horario").innerHTML = `
    <li>Segunda: ${h.segunda}</li>
    <li>Terça: ${h.terca}</li>
    <li>Quarta: ${h.quarta}</li>
    <li>Quinta: ${h.quinta}</li>
    <li>Sexta: ${h.sexta}</li>
  `;
});

// 📢 AVISOS
const avisosRef = collection(db, "avisos");
const avisosQuery = query(avisosRef, orderBy("data", "desc"));
const avisosSnap = await getDocs(avisosQuery);

const listaAvisos = document.getElementById("avisos");
listaAvisos.innerHTML = "";

avisosSnap.forEach((doc) => {
  const a = doc.data();
  const li = document.createElement("li");

  li.className = "bg-yellow-100 p-2 rounded";
  li.innerHTML = `<strong>${a.titulo}</strong><br>${a.texto}`;

  listaAvisos.appendChild(li);
});



// 🚪 LOGOUT
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
