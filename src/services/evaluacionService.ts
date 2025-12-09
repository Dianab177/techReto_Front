import { api } from "./api";
import type { Inscripcion } from "../types/Inscripcion";

// ======================================================
//  OBTENER TODAS LAS INSCRIPCIONES PARA ADMIN (EVALUACIONES)
// ======================================================
export async function getEvaluacionesAdmin(): Promise<Inscripcion[]> {
  const res = await api.get("/inscripciones/admin/todas");
  return res.data;
}

// ======================================================
//  OBTENER UNA INSCRIPCIÓN (si quieres ver detalle)
// ======================================================
export async function getEvaluacion(id: number): Promise<Inscripcion> {
  const res = await api.get(`/inscripciones/${id}`);
  return res.data;
}

// ======================================================
//  ACTUALIZAR EVALUACIÓN (estadoAprobacion, estadoEntrega, etc)
// ======================================================
export async function actualizarEvaluacion(
  id: number,
  data: Partial<Inscripcion>
): Promise<Inscripcion> {
  const res = await api.put(`/inscripciones/${id}`, data);
  return res.data;
}

// ======================================================
//  ELIMINAR INSCRIPCIÓN / EVALUACIÓN
// ======================================================
export async function eliminarEvaluacion(id: number) {
  await api.delete(`/inscripciones/${id}`);
}
