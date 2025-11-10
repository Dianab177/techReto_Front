import axios from "axios";
const API_URL = "http://localhost:8080/api/inscripciones";

export async function inscribirse(idUsuario: number, idReto: number) {
  const payload = { idUsuario, idReto };
  const { data } = await axios.post(API_URL, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function getInscripcionesUsuario(idUsuario: number) {
  const { data } = await axios.get(`${API_URL}/usuario/${idUsuario}`);
  return data;
}

export async function eliminarInscripcion(idInscripcion: number) {
  await axios.delete(`${API_URL}/${idInscripcion}`);
}

export async function getInscripcionesPorReto(idReto: number) {
  const { data } = await axios.get(`${API_URL}/reto/${idReto}`);
  return data;
}