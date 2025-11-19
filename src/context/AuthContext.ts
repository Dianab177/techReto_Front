import { createContext } from "react";
import type { Usuario } from "../types/Usuario";

interface AuthState {
  user: Usuario | null;
  token: string | null;
}

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (payload: Usuario) => Promise<void>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
