export interface Usuario {
  idUsuario?: number;
  nombre: string;
  email: string;
  password?: string;
  rol: "ADMIN" | "EMPRESA" | "PARTICIPANTE";
  competencias?: string;
}
