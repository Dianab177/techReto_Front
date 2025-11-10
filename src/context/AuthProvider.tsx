import { useEffect, useMemo, useState } from "react";
import type { Usuario } from "../types/Usuario";
import { loginUsuario, registerUsuario } from "../services/usuarioService";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("tr_user");
      const savedToken = localStorage.getItem("tr_token");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedToken) setToken(savedToken);
    } catch (e) {
      console.error("Error al recuperar usuario del localStorage:", e);
      localStorage.clear();
    }
  }, []);


  const login = async (email: string, password: string) => {
    try {
      // El backend devuelve directamente un objeto Usuario
      const usuario = await loginUsuario(email, password);

      setUser(usuario);
      localStorage.setItem("tr_user", JSON.stringify(usuario));

      // Por ahora no manejamos token (el backend no lo envía)
      setToken(null);
      localStorage.removeItem("tr_token");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

 
  const register = async (payload: Usuario) => {
    try {
      const usuario = await registerUsuario(payload);
      setUser(usuario);
      localStorage.setItem("tr_user", JSON.stringify(usuario));
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  };

 
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("tr_user");
    localStorage.removeItem("tr_token");
  };

  // 🔹 Valor del contexto
  const value = useMemo(
    () => ({ user, token, login, register, logout }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
