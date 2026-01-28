import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.login = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    alert("Preencha email e senha");
    return;
  }

  try {
    // 🔐 LOGIN NO AUTH
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    const uid = cred.user.uid;

    // 📄 BUSCAR PERFIL NO FIRESTORE
    const ref = doc(db, "usuarios", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert("Usuário sem perfil no sistema");
      return;
    }

    const dados = snap.data();
console.log("DADOS DO USUÁRIO:", dados);
console.log("PERFIL RECEBIDO:", dados.perfil);
alert("Perfil recebido: [" + dados.perfil + "]");

    // 🚦 REDIRECIONAMENTO
    if (dados.perfil === "aluno") {
  window.location.href = "aluno.html";
} 
else if (dados.perfil === "professor") {
  window.location.href = "professor.html";
} 
else if (dados.perfil === "gestao") {
  window.location.href = "gestao.html";
} 
else {
  alert("Perfil inválido");
}

  } catch (error) {
    alert("Erro no login: " + error.message);
  }
};
