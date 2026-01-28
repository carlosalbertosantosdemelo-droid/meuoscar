import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("Usuário sem perfil no sistema");
    window.location.href = "index.html";
    return;
  }

  const dados = snap.data();

  if (dados.perfil !== "aluno") {
    alert("Acesso não autorizado");
    window.location.href = "index.html";
  }
});
