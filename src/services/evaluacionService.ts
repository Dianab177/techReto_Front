import { api } from "./api";
import type { Inscripcion } from "../types/Inscripcion";

// ================================
//  TODAS LAS INSCRIPCIONES PARA ADMIN
// ================================
export async function getEvaluacionesAdmin(): Promise<Inscripcion[]> {
  const res = await api.get("/inscripciones/admin/todas");
  return res.data;
}

// ================================
//  OBTENER UNA EVALUACIÓN (inscripción)
// ================================
export async function getEvaluacion(id: number): Promise<Inscripcion> {
  const res = await api.get(`/inscripciones/${id}`);
  return res.data;
}

// ================================
//  ACTUALIZAR EVALUACIÓN (Aprobación/Entrega/Enlaces)
// ================================
export async function actualizarEvaluacion(
  id: number,
  data: Partial<Inscripcion>
): Promise<Inscripcion> {
  const res = await api.put(`/inscripciones/${id}`, data);
  return res.data;
}

// ================================
//  ELIMINAR INSCRIPCIÓN (Admin o Empresa)
// ================================
export async function eliminarEvaluacion(id: number) {
  await api.delete(`/inscripciones/${id}`);
}
