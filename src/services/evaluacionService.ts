import { api } from "./api";
import type { Evaluacion } from "../types/Evaluacion";

const BASE_URL = "/evaluaciones";

// Obtener todas
export async function getEvaluaciones(): Promise<Evaluacion[]> {
  const res = await api.get<Evaluacion[]>(BASE_URL);
  return res.data;
}

// Obtener por ID
export async function getEvaluacionPorId(id: number): Promise<Evaluacion> {
  const res = await api.get<Evaluacion>(`${BASE_URL}/${id}`);
  return res.data;
}

// Actualizar evaluación
export async function updateEvaluacion(id: number, data: Partial<Evaluacion>) {
  const res = await api.put(`${BASE_URL}/${id}`, data);
  return res.data;
}

// Eliminar evaluación
export async function deleteEvaluacion(id: number) {
  const res = await api.delete(`${BASE_URL}/${id}`);
  return res.data;
}
