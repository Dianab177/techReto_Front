import { useEffect, useMemo, useState } from "react";
import type { Usuario } from "../types/Usuario";
import { loginUsuario, registerUsuario } from "../services/usuarioService";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("tr_user");
    const savedToken = localStorage.getItem("tr_token");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
  }, []);

  const login = async (email: string, password: string) => {
    const { usuario, token } = await loginUsuario(email, password);
    setUser(usuario);
    if (token) setToken(token);
    localStorage.setItem("tr_user", JSON.stringify(usuario));
    if (token) localStorage.setItem("tr_token", token);
  };

  const register = async (payload: Usuario) => {
    const usuario = await registerUsuario(payload);
    setUser(usuario);
    localStorage.setItem("tr_user", JSON.stringify(usuario));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("tr_user");
    localStorage.removeItem("tr_token");
  };

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
