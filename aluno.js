import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.carregarHorario = async function () {
  const turno = document.getElementById("turno").value;
  const turma = document.getElementById("turma").value;
  const tabela = document.getElementById("tabelaHorario");

  tabela.innerHTML = "";

  if (!turno || !turma) {
    tabela.innerHTML = `
      <tr>
        <td colspan="3" class="p-2 text-center">
          Selecione turno e turma
        </td>
      </tr>`;
    return;
  }

  const q = query(
    collection(db, "horarios"),
    where("turno", "==", turno),
    where("turma", "==", turma)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    tabela.innerHTML = `
      <tr>
        <td colspan="3" class="p-2 text-center">
          Nenhum horário encontrado
        </td>
      </tr>`;
    return;
  }

  snapshot.forEach(doc => {
    const h = doc.data();
    tabela.innerHTML += `
      <tr>
        <td class="border p-2">${h.dia}</td>
        <td class="border p-2">${h.horario}</td>
        <td class="border p-2">${h.aula}</td>
      </tr>`;
  });
};
