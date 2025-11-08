import { api } from "./api";
import type { Usuario } from "../types/Usuario";
import type { AuthResponse } from "../types/Auth";

export const loginUsuario = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post("/usuarios/login", { email, password });
  return data;
};

export const registerUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const { data } = await api.post("/usuarios", usuario);
  return data;
};

export const getPerfil = async (): Promise<Usuario> => {
  const { data } = await api.get("/usuarios/perfil");
  return data;
};
