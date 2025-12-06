import type { Usuario } from "./Usuario";


export interface AuthResponse {
  token?: string;     
  usuario: Usuario;
}
