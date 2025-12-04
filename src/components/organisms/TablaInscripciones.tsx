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
  idReto?: number;
}

type InscripcionEditable = Inscripcion & {
  enlaceRepositorio?: string;
};

export default function TablaInscripciones({ idReto }: Props) {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);

  const [inscripcionSeleccionada, setInscripcionSeleccionada] =
    useState<InscripcionEditable | null>(null);

  const [mostrarModal, setMostrarModal] = useState(false);

  // ===============================
  //   CARGAR INSCRIPCIONES DEL RETO
  // ===============================
  useEffect(() => {
    if (!idReto) return;

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

  // ===============================
  //   ELIMINAR INSCRIPCIÓN
  // ===============================
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

    if (!confirm.isConfirmed) return;

    try {
      await eliminarInscripcion(idInscripcion);
      Swal.fire("Eliminado", "La inscripción fue eliminada", "success");

      setInscripciones((prev) =>
        prev.filter((i) => i.idInscripcion !== idInscripcion)
      );
    } catch (error) {
      console.error("Error al eliminar inscripción:", error);
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  // ===============================
  //   GUARDAR CAMBIOS DEL MODAL
  // ===============================
  const handleGuardar = async () => {
    if (!inscripcionSeleccionada) return;

    try {
      const payload = {
        estadoEntrega: inscripcionSeleccionada.estadoEntrega,
        estadoAprobacion: inscripcionSeleccionada.estadoAprobacion,
        enlaceRepositorio: inscripcionSeleccionada.enlaceRepositorio ?? null,
      };

      await axios.put(
        `http://localhost:8080/api/inscripciones/${inscripcionSeleccionada.idInscripcion}`,
        payload
      );

      Swal.fire("Guardado", "Estado actualizado correctamente", "success");
      setMostrarModal(false);

      // Actualizar tabla
      setInscripciones((prev: Inscripcion[]) =>
        prev.map((i: Inscripcion) =>
          i.idInscripcion === inscripcionSeleccionada.idInscripcion
            ? {
                ...i,
                estadoEntrega: payload.estadoEntrega ?? i.estadoEntrega,
                estadoAprobacion:
                  payload.estadoAprobacion ?? i.estadoAprobacion,
                enlaceRepositorio:
                  payload.enlaceRepositorio ?? i.enlaceRepositorio,
              }
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
              <th className="py-2 px-3">Usuario</th>
              <th className="py-2 px-3">Inscrito</th>
              <th className="py-2 px-3">Entrega</th>
              <th className="py-2 px-3">Link</th>
              <th className="py-2 px-3">Aprobación</th>
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

                <td className="py-2 px-3">{i.usuario?.nombre}</td>

                <td className="py-2 px-3">
                  {new Date(i.fechaInscripcion).toLocaleDateString()}
                </td>

                <td className="py-2 px-3">
                  <EstadoBadge estado={i.estadoEntrega || "PENDIENTE"} />
                </td>

                {/* LINK ENTREGA */}
                <td className="py-2 px-3">
                  {(i as InscripcionEditable).enlaceRepositorio ? (
                    <a
                      href={(i as InscripcionEditable).enlaceRepositorio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 underline"
                    >
                      Ver entrega
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                <td className="py-2 px-3">
                  <EstadoBadge estado={i.estadoAprobacion || "—"} />
                </td>

                <td className="py-2 px-3 flex gap-2">
                  <button
                    onClick={() => {
                      setInscripcionSeleccionada({
                        ...i,
                        enlaceRepositorio:
                          (i as InscripcionEditable).enlaceRepositorio ?? "",
                      });
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

      {/* =============================== */}
      {/* MODAL */}
      {/* =============================== */}
      {mostrarModal && inscripcionSeleccionada && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
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
              </select>
            </label>

            <label className="block mb-3 text-sm">
              Estado de aprobación:
              <select
                value={inscripcionSeleccionada.estadoAprobacion || "PENDIENTE"}
                onChange={(e) =>
                  setInscripcionSeleccionada({
                    ...inscripcionSeleccionada,
                    estadoAprobacion: e.target
                      .value as Inscripcion["estadoAprobacion"],
                  })
                }
                className="block w-full mt-1 p-2 border rounded"
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="APROBADO">Aprobado</option>
                <option value="RECHAZADO">Rechazado</option>
              </select>
            </label>

            <label className="block mb-3 text-sm">
              Enlace del proyecto:
              <input
                type="text"
                value={inscripcionSeleccionada.enlaceRepositorio || ""}
                onChange={(e) =>
                  setInscripcionSeleccionada({
                    ...inscripcionSeleccionada,
                    enlaceRepositorio: e.target.value,
                  })
                }
                className="block w-full mt-1 p-2 border rounded"
                placeholder="https://github.com/... o Figma..."
              />
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
