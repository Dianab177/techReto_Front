import { api } from "./api";
import type { Reto } from "../types/Reto";

const BASE_URL = "/retos";

// ===============================================
//  OBTENER TODOS LOS RETOS
// ===============================================
export const getRetos = async (): Promise<Reto[]> => {
  const { data } = await api.get(BASE_URL);
  return data;
};

// ===============================================
//  OBTENER RETO POR ID
// ===============================================
export const getReto = async (id: number): Promise<Reto> => {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data;
};

// ===============================================
//  OBTENER RETOS DE UNA EMPRESA
// ===============================================
export async function getRetosEmpresa(idEmpresa: number) {
  const { data } = await api.get(`${BASE_URL}/empresa/${idEmpresa}`);
  return data;
}

// ===============================================
//  BLOQUEAR / DESBLOQUEAR RETO (ADMIN)
// ===============================================
export async function toggleBloqueoReto(id: number): Promise<Reto> {
  const { data } = await api.put(`${BASE_URL}/${id}/toggle-bloqueo`);
  return data;
}
