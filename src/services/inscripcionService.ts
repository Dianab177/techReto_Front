import axios from "axios";
import type { Inscripcion } from "../types/Inscripcion";

const API_URL = "http://localhost:8080/api/inscripciones";

// ======================================================
//  INSCRIBIRSE
// ======================================================
export async function inscribirse(idUsuario: number, idReto: number) {
  const payload = { idUsuario, idReto };
  const { data } = await axios.post(API_URL, payload);
  return data; // devuelve la inscripción creada
}

// ======================================================
//  OBTENER INSCRIPCIONES POR USUARIO
// ======================================================
export async function getInscripcionesUsuario(
  idUsuario: number
): Promise<Inscripcion[]> {
  const { data } = await axios.get<Inscripcion[]>(
    `${API_URL}/usuario/${idUsuario}`
  );
  return data;
}

// ======================================================
//  ELIMINAR INSCRIPCIÓN
// ======================================================
export async function eliminarInscripcion(idInscripcion: number) {
  await axios.delete(`${API_URL}/${idInscripcion}`);
}

// ======================================================
//  OBTENER INSCRIPCIONES POR RETO
// ======================================================
export async function getInscripcionesPorReto(
  idReto: number
): Promise<Inscripcion[]> {
  const { data } = await axios.get<Inscripcion[]>(
    `${API_URL}/reto/${idReto}`
  );
  return data;
}

export async function ocultarInscripcion(idInscripcion: number) {
  await axios.patch(`${API_URL}/ocultar/${idInscripcion}`);
} 

// ======================================================
//  ENTREGAR RETO (enviar enlaces)
// ======================================================
export async function entregarReto(
  idInscripcion: number,
  enlaces: {
    enlaceRepositorio?: string;
    enlaceFigma?: string;
    enlaceDemo?: string;
  }
) {
  const { data } = await axios.put(
    `${API_URL}/${idInscripcion}/entregar`,
    enlaces
  );
  return data;
}
