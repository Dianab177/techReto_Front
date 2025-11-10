import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Usuario } from "../types/Usuario";
import { loginUsuario, registerUsuario } from "../services/usuarioService";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

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

  
  const login = useCallback(async (email: string, password: string) => {
    try {
      const usuario = await loginUsuario(email, password);
      setUser(usuario);
      localStorage.setItem("tr_user", JSON.stringify(usuario));

      
      setToken(null);
      localStorage.removeItem("tr_token");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  }, []);


  const register = useCallback(async (payload: Usuario) => {
    try {
      const usuario = await registerUsuario(payload);
      setUser(usuario);
      localStorage.setItem("tr_user", JSON.stringify(usuario));
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  }, []);


  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("tr_user");
    localStorage.removeItem("tr_token");
    navigate("/");
  }, [navigate]);

  // 🔹 Valor del contexto (sin warnings)
  const value = useMemo(
    () => ({ user, token, login, register, logout }),
    [user, token, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
