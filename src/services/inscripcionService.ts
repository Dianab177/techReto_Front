import axios from "axios";

const API_URL = "http://localhost:8080/api/inscripciones";

export async function inscribirse(idUsuario: number, idReto: number) {
  // 🔹 El backend espera `idUsuario` y `idReto`
  const payload = { idUsuario: idUsuario, idReto: idReto };

  const { data } = await axios.post(API_URL, payload, {
    headers: { "Content-Type": "application/json" },
  });

  return data;
}
