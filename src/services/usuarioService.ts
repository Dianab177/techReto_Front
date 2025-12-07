import axios from "axios";
import type { Usuario } from "../types/Usuario";

const API_URL = "https://techreto-back-production.up.railway.app/api/usuarios";

// LOGIN
export async function loginUsuario(
  email: string,
  password: string
): Promise<Usuario> {
  const response = await axios.post<Usuario>(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
}

// REGISTRO
export async function registerUsuario(usuario: Usuario): Promise<Usuario> {
  const response = await axios.post<Usuario>(API_URL, usuario);
  return response.data;
}

// OBTENER TODOS
export async function getUsuarios(): Promise<Usuario[]> {
  const response = await axios.get<Usuario[]>(API_URL);
  return response.data;
}

// OBTENER UNO POR ID
export async function getUsuarioPorId(id: number): Promise<Usuario> {
  const response = await axios.get<Usuario>(`${API_URL}/${id}`);
  return response.data;
}

// ACTUALIZAR USUARIO (PUT)
export async function updateUsuario(usuario: Usuario): Promise<Usuario> {
  const response = await axios.put<Usuario>(
    `${API_URL}/${usuario.idUsuario}`,
    usuario
  );
  return response.data;
}

export async function deleteUsuario(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
