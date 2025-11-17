import { useEffect, useState } from "react";
import { getRetosEmpresa } from "../services/retoServices";
import { api } from "../services/api";
import type { Reto } from "../types/Reto";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

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

  // Modal de edición
  const [editando, setEditando] = useState<Reto | null>(null);

  // ============================
  // Cargar retos de la empresa
  // ============================
  const cargarRetos = async () => {
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
  };

  useEffect(() => {
    cargarRetos();
  }, [user]);

  // ============================
  // Crear reto
  // ============================
  const crearReto = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      setError("Debes completar todos los campos obligatorios");
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
    } catch (err: unknown) {
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTipo(e.target.value as "INDIVIDUAL" | "EQUIPO")
            }
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
          MODAL EDICIÓN
      =================== */}
      {editando && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Editar reto</h2>

            <input
              type="text"
              value={editando.titulo}
              onChange={(e) =>
                setEditando({ ...editando, titulo: e.target.value })
              }
              className="border p-2 w-full rounded mb-2"
            />

            <textarea
              value={editando.descripcion}
              onChange={(e) =>
                setEditando({ ...editando, descripcion: e.target.value })
              }
              className="border p-2 w-full rounded mb-2"
            />

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
