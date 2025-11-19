import { useEffect, useState } from "react";
import axios from "axios";
import {
  getInscripcionesPorReto,
  eliminarInscripcion,
} from "../../services/inscripcionService";
import type { Inscripcion } from "../../types/Inscripcion";
import Loader from "../Loader";
import EstadoBadge from "../atoms/EstadoBadge";
import Swal from "sweetalert2";

interface Props {
  idReto?: number; // Puede llegar undefined, controlado
}

export default function TablaInscripciones({ idReto }: Props) {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [inscripcionSeleccionada, setInscripcionSeleccionada] =
    useState<Inscripcion | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // 🔹 Cargar inscripciones del reto
  useEffect(() => {
    if (!idReto) return; // evita el 404 si idReto es undefined
    (async () => {
      try {
        const data = await getInscripcionesPorReto(idReto);
        setInscripciones(data);
      } catch (error) {
        console.error("Error al cargar inscripciones:", error);
        Swal.fire("Error", "No se pudieron cargar las inscripciones", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [idReto]);

  // 🔹 Eliminar inscripción
  const handleEliminar = async (idInscripcion: number) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar inscripción?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (confirm.isConfirmed) {
      try {
        await eliminarInscripcion(idInscripcion);
        Swal.fire("Eliminado", "La inscripción fue eliminada", "success");
        setInscripciones((prev) =>
          prev.filter((i) => i.idInscripcion !== idInscripcion)
        );
      } catch (error) {
        console.error("Error al eliminar:", error);
        Swal.fire("Error", "No se pudo eliminar la inscripción", "error");
      }
    }
  };

  // 🔹 Guardar cambios en el modal
  const handleGuardar = async () => {
    if (!inscripcionSeleccionada) return;

    try {
      await axios.put(
        `http://localhost:8080/api/inscripciones/${inscripcionSeleccionada.idInscripcion}`,
        inscripcionSeleccionada
      );

      Swal.fire("Guardado", "Estado actualizado correctamente", "success");
      setMostrarModal(false);

      // Actualizar la tabla localmente
      setInscripciones((prev) =>
        prev.map((i) =>
          i.idInscripcion === inscripcionSeleccionada.idInscripcion
            ? inscripcionSeleccionada
            : i
        )
      );
    } catch (error) {
      console.error("Error al actualizar inscripción:", error);
      Swal.fire("Error", "No se pudo actualizar la inscripción", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="mt-6 bg-slate-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-white">
        Participantes inscritos
      </h3>

      {!idReto ? (
        <p className="text-gray-400">No se encontró el reto.</p>
      ) : inscripciones.length === 0 ? (
        <p className="text-gray-400">No hay inscripciones aún.</p>
      ) : (
        <table className="w-full text-left text-gray-300">
          <thead className="bg-slate-700 text-sm uppercase">
            <tr>
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Usuario / Equipo</th>
              <th className="py-2 px-3">Fecha inscripción</th>
              <th className="py-2 px-3">Entrega</th>
              <th className="py-2 px-3">Aprobado</th>
              <th className="py-2 px-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((i, idx) => (
              <tr
                key={i.idInscripcion}
                className="border-b border-slate-600 hover:bg-slate-700 transition"
              >
                <td className="py-2 px-3">{idx + 1}</td>
                <td className="py-2 px-3">
                  {i.equipo ? (
                    <span className="font-semibold text-emerald-400">
                      🧑‍🤝‍🧑 {i.equipo.nombre}
                    </span>
                  ) : (
                    i.usuario?.nombre
                  )}
                </td>
                <td className="py-2 px-3">
                  {new Date(i.fechaInscripcion).toLocaleDateString()}
                </td>
                <td className="py-2 px-3">
                  <EstadoBadge estado={i.estadoEntrega || "PENDIENTE"} />
                </td>
                <td className="py-2 px-3">
                  <EstadoBadge estado={i.estadoAprobacion || "—"} />
                </td>
                <td className="py-2 px-3 flex gap-2">
                  <button
                    onClick={() => {
                      setInscripcionSeleccionada(i);
                      setMostrarModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(i.idInscripcion)}
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                  >
                    ❌ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Modal de edición */}
      {mostrarModal && inscripcionSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Editar inscripción #{inscripcionSeleccionada.idInscripcion}
            </h2>

            <label className="block mb-3 text-sm">
              Estado de entrega:
              <select
                value={inscripcionSeleccionada.estadoEntrega || "PENDIENTE"}
                onChange={(e) =>
                  setInscripcionSeleccionada({
                    ...inscripcionSeleccionada,
                    estadoEntrega: e.target
                      .value as Inscripcion["estadoEntrega"],
                  })
                }
                className="block w-full mt-1 p-2 border rounded"
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="ENTREGADO">Entregado</option>
                <option value="APROBADO">Aprobado</option>
                <option value="RECHAZADO">Rechazado</option>
              </select>
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardar}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
