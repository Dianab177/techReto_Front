import axios from "axios";
import type { Usuario } from "../types/Usuario";

const API_URL = "http://localhost:8080/api/usuarios";

// 🔹 LOGIN
export async function loginUsuario(email: string, password: string): Promise<Usuario> {
  const response = await axios.post<Usuario>(`${API_URL}/login`, { email, password });
  return response.data; // El backend devuelve directamente el Usuario
}

// 🔹 REGISTRO
export async function registerUsuario(usuario: Usuario): Promise<Usuario> {
  const response = await axios.post<Usuario>(API_URL, usuario);
  return response.data;
}

// 🔹 OBTENER TODOS (si los necesitas)
export async function getUsuarios(): Promise<Usuario[]> {
  const response = await axios.get<Usuario[]>(API_URL);
  return response.data;
}

// 🔹 OBTENER UNO POR ID
export async function getUsuarioPorId(id: number): Promise<Usuario> {
  const response = await axios.get<Usuario>(`${API_URL}/${id}`);
  return response.data;
}
