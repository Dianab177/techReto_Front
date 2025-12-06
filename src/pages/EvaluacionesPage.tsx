import { useEffect, useState } from "react";
import {
  getEvaluaciones,
  updateEvaluacion,
  deleteEvaluacion,
} from "../services/evaluacionService";
import type { Evaluacion } from "../types/Evaluacion";
import Loader from "../components/Loader";
import Swal from "sweetalert2";

export default function EvaluacionesPage() {
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Evaluacion | null>(null);

  const cargarEvaluaciones = async () => {
    try {
      setLoading(true);
      const data = await getEvaluaciones();
      setEvaluaciones(data);
    } catch (error) {
      console.error("Error cargando evaluaciones", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEvaluaciones();
  }, []);

  const guardarCambios = async () => {
    if (!editando) return;

    try {
      await updateEvaluacion(editando.idEvaluacion, editando);
      Swal.fire("Actualizado", "La evaluación fue modificada", "success");
      setEditando(null);
      cargarEvaluaciones();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo guardar la evaluación", "error");
    }
  };

  const eliminar = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar evaluación?",
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteEvaluacion(id);
      Swal.fire("Eliminada", "", "success");
      cargarEvaluaciones();
    } catch (error) {
      console.error("Error al eliminar:", error);
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Evaluaciones</h1>

      <div className="space-y-4">
        {evaluaciones.length === 0 && (
          <p className="text-gray-600">No hay evaluaciones registradas.</p>
        )}

        {evaluaciones.map((ev) => (
          <div
            key={ev.idEvaluacion}
            className="bg-slate-800 text-white p-4 rounded border border-slate-600 shadow flex justify-between items-start gap-4"
          >
            <div>
              <h3 className="font-bold text-lg">
                {ev.inscripcion?.reto?.titulo ?? "Reto desconocido"}
              </h3>

              <p className="text-sm mt-2">
                <strong>Participante:</strong> {ev.inscripcion?.usuario?.nombre}
              </p>

              <p className="text-sm">
                <strong>Nota:</strong> {ev.nota}
              </p>

              <p className="text-sm">
                <strong>Estado:</strong> {ev.estado}
              </p>

              <p className="text-xs mt-1 text-gray-400">{ev.fechaEvaluacion}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => setEditando(ev)}
                className="text-blue-400 hover:underline text-sm"
              >
                Editar
              </button>

              <button
                onClick={() => eliminar(ev.idEvaluacion)}
                className="text-red-400 hover:underline text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDICIÓN */}
      {editando && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Editar evaluación</h2>

            <input
              type="number"
              placeholder="Nota"
              value={editando.nota ?? ""}
              onChange={(e) =>
                setEditando({ ...editando, nota: Number(e.target.value) })
              }
              className="border p-2 w-full rounded mb-2"
            />

            <textarea
              placeholder="Comentario"
              value={editando.comentario ?? ""}
              onChange={(e) =>
                setEditando({ ...editando, comentario: e.target.value })
              }
              className="border p-2 w-full rounded mb-2 min-h-[80px]"
            />

            <button
              onClick={guardarCambios}
              className="bg-slate-900 text-white w-full py-2 rounded"
            >
              Guardar cambios
            </button>

            <button
              onClick={() => setEditando(null)}
              className="text-center text-red-600 w-full mt-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
