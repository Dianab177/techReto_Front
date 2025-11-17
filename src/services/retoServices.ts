import { api } from "./api";
import type { Reto } from "../types/Reto";

export const getRetos = async (): Promise<Reto[]> => {
  const { data } = await api.get("/retos");
  return data;
};

export const getReto = async (id: number): Promise<Reto> => {
  const { data } = await api.get(`/retos/${id}`);
  return data;
};

export async function getRetosEmpresa(idEmpresa: number) {
  const { data } = await api.get(`/retos/empresa/${idEmpresa}`);
  return data;
}

