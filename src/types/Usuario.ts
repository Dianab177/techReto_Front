export type Rol = "ADMIN" | "EMPRESA" | "PARTICIPANTE";

export interface Usuario {
  id_usuario?: number;
  nombre: string;
  email: string;
  password?: string;
  rol: Rol;
}
