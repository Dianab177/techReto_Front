import { useEffect, useState } from "react";
import {
  getUsuarios,
  updateUsuario,
  deleteUsuario,
} from "../services/usuarioService";
import type { Usuario } from "../types/Usuario";
import Loader from "../components/Loader";
import Swal from "sweetalert2";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para edición
  const [editando, setEditando] = useState<Usuario | null>(null);

  // ============================
  // CARGAR USUARIOS
  // ============================
  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  if (loading) return <Loader />;

  // ============================
  // GUARDAR EDICIÓN
  // ============================
  const guardarEdicion = async () => {
    if (!editando) return;

    try {
      await updateUsuario(editando);
      await Swal.fire(
        "Actualizado",
        "El usuario ha sido modificado",
        "success"
      );

      setEditando(null);
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar el usuario", "error");
    }
  };

  // ============================
  // ELIMINAR USUARIO
  // ============================
  const eliminar = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteUsuario(id);
      Swal.fire("Eliminado", "El usuario fue eliminado", "success");
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar el usuario", "error");
    }
  };

  // ============================
  // RENDER
  // ============================
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Usuarios registrados</h1>

      <div className="space-y-4">
        {usuarios.length === 0 ? (
          <p className="text-gray-300">No hay usuarios registrados.</p>
        ) : (
          usuarios.map((u) => (
            <div
              key={u.idUsuario}
              className="bg-slate-800 text-white p-4 rounded border border-slate-700 flex justify-between items-start"
            >
              <div className="space-y-1">
                <p>
                  <strong>ID:</strong> {u.idUsuario}
                </p>
                <p>
                  <strong>Nombre:</strong> {u.nombre}
                </p>
                <p>
                  <strong>Email:</strong> {u.email}
                </p>
                <p>
                  <strong>Rol:</strong> {u.rol}
                </p>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={() => setEditando(u)}
                  className="text-blue-900 hover:underline text-sm"
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminar(u.idUsuario!)}
                  className="text-red-900 hover:underline text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ============================
          MODAL EDICIÓN
      ============================ */}
      {editando && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-slate-950 p-6 rounded shadow w-[380px]">
            <h2 className="text-xl font-bold mb-4">Editar usuario</h2>

            <input
              type="text"
              value={editando.nombre}
              onChange={(e) =>
                setEditando({ ...editando, nombre: e.target.value })
              }
              className="border p-2 w-full rounded mb-2"
              placeholder="Nombre"
            />

            <input
              type="email"
              value={editando.email}
              onChange={(e) =>
                setEditando({ ...editando, email: e.target.value })
              }
              className="border p-2 w-full rounded mb-2"
              placeholder="Email"
            />

            <select
              value={editando.rol}
              onChange={(e) =>
                setEditando({
                  ...editando,
                  rol: e.target.value as Usuario["rol"],
                })
              }
              className="border bg-slate-900 p-2 w-full rounded mb-4"
            >
              <option value="PARTICIPANTE">PARTICIPANTE</option>
              <option value="EMPRESA">EMPRESA</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <button
              onClick={guardarEdicion}
              className="bg-slate-900 text-white w-full py-2 rounded hover:bg-slate-700"
            >
              Guardar cambios
            </button>

            <button
              className="mt-2 text-center w-full text-sm text-gray-200"
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
