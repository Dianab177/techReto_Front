import type { FormEvent } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/retos");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || "No fue posible iniciar sesión");
      } else {
        setError("No fue posible iniciar sesión");
      }
    }
  };

  return (
    <section className="py-10">
      <div className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold">Iniciar sesión</h2>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="bg-slate-900 text-white rounded py-2">Entrar</button>
        </form>
      </div>
    </section>
  );
}
