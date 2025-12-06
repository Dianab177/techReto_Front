import { useEffect, useState } from "react";
import { getRetosEmpresa } from "../services/retoServices";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import { api } from "../services/api";
import Swal from "sweetalert2";
import type { Reto } from "../types/Reto";

export default function EmpresaRetosPage() {
  const { user } = useAuth();
  const [retos, setRetos] = useState<Reto[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarRetos = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await getRetosEmpresa(Number(user.idUsuario));
      setRetos(data);
    } catch (err) {
      console.error("Error cargando retos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarRetos();
  }, []);

  const eliminarReto = async (id: number) => {
    const ok = await Swal.fire({
      title: "¿Eliminar reto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });

    if (!ok.isConfirmed) return;

    try {
      await api.delete(`/retos/${id}`);
      await Swal.fire("Reto eliminado", "", "success");
      cargarRetos();
    } catch {
      Swal.fire("Error al eliminar", "", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mis retos publicados</h1>

      {retos.length === 0 ? (
        <p className="text-gray-600">No tienes retos aún.</p>
      ) : (
        <div className="space-y-4">
          {retos.map((r) => (
            <div
              key={r.idReto}
              className="bg-white dark:bg-slate-800 p-4 rounded shadow"
            >
              <h3 className="font-semibold text-lg">{r.titulo}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {r.descripcion}
              </p>

              <button
                onClick={() => eliminarReto(r.idReto)}
                className="mt-3 text-red-600 hover:underline text-sm"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
