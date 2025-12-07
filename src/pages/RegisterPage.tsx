import { useState, useEffect, type FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { Usuario } from "../types/Usuario";
import type { AxiosError } from "axios";

export default function RegisterPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "PARTICIPANTE" as Usuario["rol"],
  });

  const [password, setPassword] = useState("");
  const [competencias, setCompetencias] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await register({
        ...form,
        password,
        competencias,
        idUsuario: 0,
      });

      navigate("/retos");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;

      const serverMessage =
        axiosErr.response?.data?.message ?? axiosErr.message ?? null;

      setError(serverMessage || "No fue posible registrar");
    }
  };

  return (
    <section className="py-10">
      <div className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold">Crear cuenta</h2>

        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            required
          />

          <input
            className="border p-2 rounded"
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />

          <select
            className="border p-2 rounded"
            value={form.rol}
            onChange={(e) =>
              setForm((f) => ({ ...f, rol: e.target.value as Usuario["rol"] }))
            }
          >
            <option value="PARTICIPANTE">Participante</option>
            <option value="EMPRESA">Empresa</option>
          </select>

          {form.rol === "PARTICIPANTE" && (
            <textarea
              className="border p-2 rounded min-h-20"
              placeholder="Tus competencias"
              value={competencias}
              onChange={(e) => setCompetencias(e.target.value)}
            />
          )}

          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button className="bg-slate-900 text-white rounded py-2">
            Crear cuenta
          </button>
        </form>
      </div>
    </section>
  );
}
