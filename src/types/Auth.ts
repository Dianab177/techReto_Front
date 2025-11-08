import type { Usuario } from "./Usuario";


export interface AuthResponse {
  token?: string;     // si tu backend no usa JWT, se queda undefined
  usuario: Usuario;
}
