import { useEffect, useState, useCallback } from "react";
import { getRetosEmpresa } from "../services/retoServices";
import { api } from "../services/api";
import type { Reto } from "../types/Reto";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

function normalizarFecha(fecha?: string | null): string {
  if (!fecha) return "";
  // Si viene como "2025-10-01T00:00:00"
  return fecha.split("T")[0];
}

export default function AdminPage() {
  const { user } = useAuth();

  const [retos, setRetos] = useState<Reto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Campos del formulario de creación
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<"INDIVIDUAL" | "EQUIPO">("INDIVIDUAL");
  const [estado, setEstado] = useState("ABIERTO");
  const [recompensa, setRecompensa] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Modal de edición (guarda un reto completo)
  const [editando, setEditando] = useState<Reto | null>(null);

  // ============================
  // Cargar retos de la empresa
  // ============================
  const cargarRetos = useCallback(async () => {
    if (!user?.idUsuario) return;

    try {
      setLoading(true);
      const data = await getRetosEmpresa(Number(user.idUsuario));
      setRetos(data);
    } catch (err) {
      console.error(err);
      setError("Error cargando los retos");
    } finally {
      setLoading(false);
    }
  }, [user?.idUsuario]);

  useEffect(() => {
    cargarRetos();
  }, [cargarRetos]);

  // ============================
  // Crear reto
  // ============================
  const crearReto = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      setError("Debes completar al menos título y descripción");
      return;
    }

    try {
      await api.post("/retos", {
        titulo,
        descripcion,
        tipo,
        estado,
        recompensa,
        fechaInicio,
        fechaFin,
        empresa: { idUsuario: Number(user?.idUsuario) },
      });

      Swal.fire("¡Reto creado!", "", "success");

      // Reset formulario
      setTitulo("");
      setDescripcion("");
      setRecompensa("");
      setFechaInicio("");
      setFechaFin("");

      cargarRetos();
    } catch (err) {
      console.error("Error creando reto:", err);
      setError("Error al crear el reto");
    }
  };

  // ============================
  // Eliminar reto
  // ============================
  const eliminarReto = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar reto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/retos/${id}`);
      Swal.fire("Eliminado", "El reto fue eliminado", "success");
      cargarRetos();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar el reto", "error");
    }
  };

  // ============================
  // Guardar edición
  // ============================
  const guardarEdicion = async () => {
    if (!editando) return;

    try {
      await api.put(`/retos/${editando.idReto}`, editando);
      Swal.fire("Actualizado", "El reto ha sido modificado", "success");
      setEditando(null);
      cargarRetos();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar el reto", "error");
    }
  };

  // ============================
  // Render
  // ============================

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <section className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Panel de administración</h1>

      {/* ===================
          FORMULARIO CREAR RETO
      =================== */}
      <form
        onSubmit={crearReto}
        className="bg-white p-4 rounded border mb-8 space-y-3"
      >
        <input
          type="text"
          placeholder="Título del reto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border p-2 w-full rounded min-h-[80px]"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "INDIVIDUAL" | "EQUIPO")}
            className="border p-2 rounded"
          >
            <option value="INDIVIDUAL">Individual</option>
            <option value="EQUIPO">Equipo</option>
          </select>

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="ABIERTO">Abierto</option>
            <option value="EN_CURSO">En curso</option>
            <option value="CERRADO">Cerrado</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Recompensa"
          value={recompensa}
          onChange={(e) => setRecompensa(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button className="bg-slate-900 text-white w-full py-2 rounded hover:bg-slate-700">
          Crear reto
        </button>
      </form>

      {/* ===================
          LISTA DE RETOS
      =================== */}
      <div className="space-y-4">
        {retos.length === 0 && (
          <p className="text-gray-600">Aún no has creado retos.</p>
        )}

        {retos.map((r) => (
          <div
            key={r.idReto}
            className="bg-white p-4 rounded border shadow flex justify-between"
          >
            <div>
              <h3 className="font-bold text-lg">{r.titulo}</h3>
              <p className="text-sm text-slate-600">{r.descripcion}</p>
              <p className="text-xs text-slate-500 mt-1">
                Tipo: {r.tipo} · Estado: {r.estado} ·{" "}
                {r.recompensa || "Sin recompensa"}
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <button
                onClick={() => setEditando(r)}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </button>

              <button
                onClick={() => eliminarReto(r.idReto)}
                className="text-red-600 hover:underline text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===================
          MODAL EDICIÓN COMPLETA
      =================== */}
      {editando && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-[420px]">
            <h2 className="text-xl font-bold mb-4">Editar reto</h2>

            {/* Título */}
            <input
              type="text"
              value={editando.titulo ?? ""}
              onChange={(e) =>
                setEditando({ ...editando, titulo: e.target.value })
              }
              className="border p-2 w-full rounded mb-2"
              placeholder="Título"
            />

            {/* Descripción */}
            <textarea
              value={editando.descripcion ?? ""}
              onChange={(e) =>
                setEditando({ ...editando, descripcion: e.target.value })
              }
              className="border p-2 w-full rounded mb-2 min-h-[70px]"
              placeholder="Descripción"
            />

            {/* Tipo y Estado */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              <select
                value={editando.tipo ?? "INDIVIDUAL"}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    tipo: e.target.value as "INDIVIDUAL" | "EQUIPO",
                  })
                }
                className="border p-2 rounded"
              >
                <option value="INDIVIDUAL">Individual</option>
                <option value="EQUIPO">Equipo</option>
              </select>

              <select
                value={editando.estado ?? "ABIERTO"}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    estado: e.target.value as
                      | "ABIERTO"
                      | "EN_CURSO"
                      | "CERRADO",
                  })
                }
                className="border p-2 rounded"
              >
                <option value="ABIERTO">Abierto</option>
                <option value="EN_CURSO">En curso</option>
                <option value="CERRADO">Cerrado</option>
              </select>
            </div>

            {/* Recompensa */}
            <input
              type="text"
              value={editando.recompensa ?? ""}
              onChange={(e) =>
                setEditando({ ...editando, recompensa: e.target.value })
              }
              className="border p-2 w-full rounded mb-2"
              placeholder="Recompensa"
            />

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="date"
                value={normalizarFecha(editando.fechaInicio)}
                onChange={(e) =>
                  setEditando({ ...editando, fechaInicio: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={normalizarFecha(editando.fechaFin)}
                onChange={(e) =>
                  setEditando({ ...editando, fechaFin: e.target.value })
                }
                className="border p-2 rounded"
              />
            </div>

            <button
              onClick={guardarEdicion}
              className="bg-slate-900 text-white w-full py-2 rounded hover:bg-slate-700"
            >
              Guardar cambios
            </button>

            <button
              className="mt-2 text-center w-full text-sm text-red-600"
              onClick={() => setEditando(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
