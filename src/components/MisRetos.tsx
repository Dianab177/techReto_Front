import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  getInscripcionesUsuario,
  eliminarInscripcion,
} from "../services/inscripcionService";
import Swal from "sweetalert2";
import axios from "axios";
import type { Inscripcion } from "../types/Inscripcion";

export default function MisRetos() {
  const { user } = useAuth();
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal entrega
  const [mostrarModal, setMostrarModal] = useState(false);
  const [inscripcionActual, setInscripcionActual] =
    useState<Inscripcion | null>(null);
  const [enlace, setEnlace] = useState("");

  // Valoración automática
  function obtenerValoracion(ins: Inscripcion): string {
    const fechaFin = ins.reto?.fechaFin ? new Date(ins.reto.fechaFin) : null;
    const hoy = new Date();

    if (ins.estadoAprobacion === "APROBADO") return "Aprobado";
    if (ins.estadoAprobacion === "RECHAZADO") return "Rechazado";

    if (ins.estadoEntrega === "ENTREGADO") return "Pendiente evaluación";

    if (fechaFin && hoy > fechaFin && ins.estadoEntrega === "PENDIENTE")
      return "No entregado (vencido)";

    return "Pendiente";
  }

  // Cargar inscripciones del usuario
  useEffect(() => {
    if (!user?.idUsuario) return;

    (async () => {
      try {
        const data = await getInscripcionesUsuario(Number(user.idUsuario));
        setInscripciones(data);
      } catch (err) {
        console.error("Error cargando inscripciones:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // Baja del reto
  const handleEliminar = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Deseas darte de baja de este reto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      await eliminarInscripcion(id);
      setInscripciones((prev) => prev.filter((i) => i.idInscripcion !== id));
      Swal.fire("Baja completada", "Has sido eliminado del reto", "success");
    }
  };

  // Abrir modal de entrega
  const abrirModalEntrega = (ins: Inscripcion) => {
    setInscripcionActual(ins);
    setEnlace(ins.enlaceRepositorio || "");
    setMostrarModal(true);
  };

  // Guardar entrega
  const guardarEntrega = async () => {
    if (!inscripcionActual) return;

    if (!enlace.trim()) {
      Swal.fire("Falta el enlace", "Introduce un enlace válido", "warning");
      return;
    }

    try {
      const payload = {
        ...inscripcionActual,
        enlaceRepositorio: enlace,
        estadoEntrega: "ENTREGADO",
      };

      await axios.put(
        `http://localhost:8080/api/inscripciones/${inscripcionActual.idInscripcion}`,
        payload
      );

      Swal.fire("Entrega enviada", "Has entregado tu reto", "success");
      setMostrarModal(false);

      // Actualizar tabla
      setInscripciones((prev) =>
        prev.map((i) =>
          i.idInscripcion === inscripcionActual.idInscripcion
            ? { ...i, enlaceRepositorio: enlace, estadoEntrega: "ENTREGADO" }
            : i
        )
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo enviar la entrega", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  if (!inscripciones.length)
    return (
      <p className="text-center mt-10 text-gray-600">
        Aún no estás inscrito en ningún reto.
      </p>
    );

  return (
    <section className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mis Retos</h2>

      <table className="w-full border border-gray-300 rounded-md">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-2 text-left">Reto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Inicio</th>
            <th className="p-2">Fin</th>
            <th className="p-2">Entrega</th>
            <th className="p-2">Valoración</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {inscripciones.map((i) => (
            <tr
              key={i.idInscripcion}
              className="border-t border-gray-200 text-center"
            >
              <td className="p-2 text-left">{i.reto?.titulo}</td>
              <td>{i.reto?.empresa?.nombre || "—"}</td>
              <td>{i.reto?.fechaInicio || "—"}</td>
              <td>{i.reto?.fechaFin || "—"}</td>

              {/* Entrega */}
              <td>
                {i.enlaceRepositorio ? (
                  <a
                    href={i.enlaceRepositorio}
                    target="_blank"
                    className="text-emerald-600 underline"
                  >
                    Ver entrega
                  </a>
                ) : (
                  <button
                    onClick={() => abrirModalEntrega(i)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Entregar
                  </button>
                )}
              </td>

              {/* Valoración */}
              <td>{obtenerValoracion(i)}</td>

              <td>
                <button
                  onClick={() => handleEliminar(i.idInscripcion)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Baja
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Entrega */}
      {mostrarModal && inscripcionActual && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-semibold mb-4">
              Entregar reto: {inscripcionActual.reto?.titulo}
            </h3>

            <input
              type="text"
              placeholder="Pega tu enlace (GitHub, Figma, Loom...)"
              value={enlace}
              onChange={(e) => setEnlace(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <button
              onClick={guardarEntrega}
              className="bg-emerald-600 text-white w-full py-2 rounded hover:bg-emerald-700"
            >
              Enviar entrega
            </button>

            <button
              className="mt-2 text-center w-full text-sm text-red-600"
              onClick={() => setMostrarModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
