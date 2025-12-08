import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import type { Inscripcion } from "../types/Inscripcion";
import Swal from "sweetalert2";

interface Reto {
  idReto: number;
  titulo?: string;
  estado: string;
  // Add other fields as needed
}

export default function PerfilEmpresa() {
  const { user } = useAuth();
  const [retos, setRetos] = useState<Reto[]>([]);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [inscripcionSeleccionada, setInscripcionSeleccionada] =
    useState<Inscripcion | null>(null);

  // =============================
  //   CARGAR DATOS
  // =============================
  useEffect(() => {
    if (!user?.idUsuario) return;

    const loadData = async () => {
      try {
        // Retos de esta empresa
        const { data: retosData } = await axios.get(
          `https://techreto-back-production.up.railway.app/api/retos/empresa/${user.idUsuario}`
        );
        setRetos(retosData);

        // Inscripciones
        const { data: insData } = await axios.get(
          "https://techreto-back-production.up.railway.app/api/inscripciones"
        );

        // Filtrar solo las de retos de esta empresa
        const filtradas = insData.filter((i: Inscripcion) =>
          retosData.some((r: Reto) => r.idReto === i.reto?.idReto)
        );

        setInscripciones(filtradas);
      } catch (err) {
        console.error("Error cargando perfil empresa:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // =============================
  //   GUARDAR CAMBIOS DEL MODAL
  // =============================
  const handleGuardar = async () => {
    if (!inscripcionSeleccionada) return;

    try {
      const payload = {
        estadoEntrega: inscripcionSeleccionada.estadoEntrega,
        estadoAprobacion: inscripcionSeleccionada.estadoAprobacion,
        enlaceRepositorio: inscripcionSeleccionada.enlaceRepositorio,
        enlaceFigma: inscripcionSeleccionada.enlaceFigma,
        enlaceDemo: inscripcionSeleccionada.enlaceDemo,
      };

      await axios.put(
        `https://techreto-back-production.up.railway.app/api/inscripciones/${inscripcionSeleccionada.idInscripcion}`,
        payload
      );
      Swal.fire("Guardado", "Estado actualizado correctamente", "success");
      setMostrarModal(false);

      // Actualizar tabla
      setInscripciones((prev) =>
        prev.map((i) =>
          i.idInscripcion === inscripcionSeleccionada.idInscripcion
            ? { ...i, ...payload }
            : i
        )
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar la inscripción", "error");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <section className="max-w-5xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Panel de empresa</h2>

      {/* ============================= */}
      {/*    LISTA DE RETOS CREADOS     */}
      {/* ============================= */}
      <h3 className="text-xl font-semibold mb-2">Retos creados</h3>
      <ul className="ml-5 list-disc mb-6">
        {retos.map((r) => (
          <li key={r.idReto}>
            {r.titulo} — <strong>{r.estado}</strong>
          </li>
        ))}
      </ul>

      {/* ============================= */}
      {/*    INSCRIPCIONES DEL RETO     */}
      {/* ============================= */}
      <h3 className="text-xl font-semibold mb-3">Participantes del reto</h3>

      {inscripciones.map((i) => (
        <div
          key={i.idInscripcion}
          className="border border-gray-500 p-4 rounded mb-4"
        >
          <p>
            <strong>Participante:</strong> {i.usuario?.nombre}
          </p>

          <p>
            <strong>Entrega:</strong> {i.estadoEntrega || "PENDIENTE"}
          </p>

          <p>
            <strong>Evaluación:</strong> {i.estadoAprobacion || "Sin evaluar"}
          </p>

          {/* ENLACES */}
          <div className="mt-2">
            <p className="font-semibold">Enlaces del proyecto:</p>
            <ul className="ml-4 list-disc">
              {i.enlaceRepositorio && (
                <li>
                  <a
                    href={i.enlaceRepositorio}
                    target="_blank"
                    className="text-yellow-400 underline"
                  >
                    🔧 Repositorio
                  </a>
                </li>
              )}
              {i.enlaceFigma && (
                <li>
                  <a
                    href={i.enlaceFigma}
                    target="_blank"
                    className="text-purple-400 underline"
                  >
                    🎨 Figma
                  </a>
                </li>
              )}
              {i.enlaceDemo && (
                <li>
                  <a
                    href={i.enlaceDemo}
                    target="_blank"
                    className="text-blue-300 underline"
                  >
                    ▶️ Demo
                  </a>
                </li>
              )}
            </ul>
          </div>

          <button
            onClick={() => {
              setInscripcionSeleccionada(i);
              setMostrarModal(true);
            }}
            className="mt-3 bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
          >
            ✏️ Editar evaluación
          </button>
        </div>
      ))}

      {/* ============================= */}
      {/*           MODAL               */}
      {/* ============================= */}
      {mostrarModal && inscripcionSeleccionada && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="dark:bg-gray-800 text-gray-100 p-6 rounded shadow w-96">
            <h3 className="text-lg font-bold mb-4">Editar evaluación</h3>

            {/* Estado de entrega */}
            <label className="block mb-3 text-sm">
              Estado de entrega:
              <select
                value={inscripcionSeleccionada.estadoEntrega || "PENDIENTE"}
                onChange={(e) =>
                  setInscripcionSeleccionada({
                    ...inscripcionSeleccionada,
                    estadoEntrega: e.target.value as "PENDIENTE" | "ENTREGADO",
                  })
                }
                className="w-full dark:bg-gray-900 mt-1 p-2 border rounded"
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="ENTREGADO">Entregado</option>
              </select>
            </label>

            {/* Estado de aprobación */}
            <label className="block mb-3 text-sm">
              Evaluación de la empresa:
              <select
                value={inscripcionSeleccionada.estadoAprobacion || "PENDIENTE"}
                onChange={(e) =>
                  setInscripcionSeleccionada({
                    ...inscripcionSeleccionada,
                    estadoAprobacion: e.target.value as
                      | "PENDIENTE"
                      | "APROBADO"
                      | "RECHAZADO",
                  })
                }
                className="w-full dark:bg-gray-900 mt-1 p-2 border rounded"
              >
                <option value="PENDIENTE">Pendiente</option>
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
                className="px-4 py-2 bg-yellow-200 hover:bg-yellow-700 text-white rounded"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
