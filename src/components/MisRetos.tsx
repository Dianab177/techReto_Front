import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  getInscripcionesUsuario,
  eliminarInscripcion,
} from "../services/inscripcionService";
import Swal from "sweetalert2";
import type { Inscripcion } from "../types/Inscripcion";

export default function MisRetos() {
  const { user } = useAuth();
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  //   FUNCIÓN PARA CALCULAR LA VALORACIÓN DEL RETO
  // ============================================================
  function obtenerValoracion(ins: Inscripcion): string {
    const fechaFin = ins.reto?.fechaFin ? new Date(ins.reto.fechaFin) : null;
    const hoy = new Date();

    if (ins.estadoAprobacion === "APROBADO") return "Aprobado";
    if (ins.estadoAprobacion === "RECHAZADO") return "Rechazado";

    if (ins.estadoEntrega === "ENTREGADO") return "Pendiente evaluación";

    if (fechaFin && hoy > fechaFin && ins.estadoEntrega === "PENDIENTE") {
      return "No entregado (vencido)";
    }

    return "Pendiente";
  }

  // ============================================================
  //   CARGAR INSCRIPCIONES DEL USUARIO
  // ============================================================
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

  // ============================================================
  //   DARSE DE BAJA DE UN RETO
  // ============================================================
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

  // ============================================================
  //   RENDER
  // ============================================================
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
            <th className="p-2">Estado</th>
            <th className="p-2">Valoración</th> {/* ← Nueva columna */}
            <th className="p-2">Acción</th>
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

              {/* Estado simple */}
              <td>{i.estado}</td>

              {/* VALORACIÓN CALCULADA */}
              <td>{obtenerValoracion(i)}</td>

              <td>
                <button
                  onClick={() => handleEliminar(i.idInscripcion)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Darse de baja
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
