import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import Loader from "../components/Loader";
import type { Reto } from "../types/Reto";
import type { AxiosError } from "axios";

export default function AdminPage() {
  const { user } = useAuth();

  const [retos, setRetos] = useState<Reto[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // ============================================
  //  CARGAR RETOS DE LA EMPRESA LOGUEADA
  // ============================================
  const cargarRetos = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await api.get(`/retos/empresa/${user.idUsuario}`);
      setRetos(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Error al cargar los retos");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    cargarRetos();
  }, [cargarRetos]);

  // ============================================
  //  CREAR NUEVO RETO
  // ============================================
  const crearReto = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    if (!titulo.trim() || !descripcion.trim()) {
      setError("Debes completar todos los campos");
      return;
    }

    if (!user) {
      setError("No hay sesión activa");
      return;
    }

    try {
      await api.post("/retos", {
        titulo,
        descripcion,
        idEmpresa: user.idUsuario,
      });

      setMensaje("Reto creado correctamente");
      setTitulo("");
      setDescripcion("");

      await cargarRetos();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Error al crear el reto");
    }
  };

  // ============================================
  //  ELIMINAR RETO
  // ============================================
  const eliminarReto = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este reto?")) return;

    try {
      await api.delete(`/retos/${id}`);
      setMensaje("Reto eliminado correctamente");

      setRetos((prev) => prev.filter((r) => r.idReto !== id));
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Error al eliminar el reto");
    }
  };

  // ============================================
  //  RENDER
  // ============================================
  if (loading) return <Loader />;
  if (error) return <div className="text-red-600 px-4">{error}</div>;

  return (
    <section className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Panel de administración</h1>

      {/* Formulario de creación */}
      <form
        onSubmit={crearReto}
        className="mb-8 flex flex-col gap-3 bg-white p-4 rounded-lg border"
      >
        <input
          type="text"
          placeholder="Título del reto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Descripción del reto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border p-2 rounded min-h-[100px]"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}

        <button
          type="submit"
          className="bg-slate-900 text-white rounded py-2 hover:bg-slate-700"
        >
          Crear reto
        </button>
      </form>

      {/* Lista de retos */}
      <div className="grid gap-4">
        {retos.length === 0 && (
          <p className="text-slate-500">No has creado retos todavía.</p>
        )}

        {retos.map((reto) => (
          <div
            key={reto.idReto}
            className="border rounded-lg bg-white p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-lg">{reto.titulo}</h3>
              <p className="text-sm text-slate-600">{reto.descripcion}</p>
            </div>

            <button
              onClick={() => eliminarReto(reto.idReto)}
              className="text-red-600 text-sm hover:underline"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
