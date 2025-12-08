import { useEffect, useState } from "react";
import { getEvaluacionesAdmin } from "../services/evaluacionService";
import type { Inscripcion } from "../types/Inscripcion";

export default function EvaluacionesPage() {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getEvaluacionesAdmin();
        setInscripciones(data);
      } catch (err) {
        console.error("Error cargando evaluaciones:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Cargando evaluaciones...</p>;

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Evaluaciones</h1>

      <table className="w-full border border-gray-300 rounded">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-2">Reto</th>
            <th className="p-2">Participante</th>
            <th className="p-2">Entrega</th>
            <th className="p-2">Aprobación</th>
          </tr>
        </thead>

        <tbody>
          {inscripciones.map((i) => (
            <tr key={i.idInscripcion} className="border-t text-center">
              <td className="p-2">{i.reto?.titulo}</td>
              <td className="p-2">{i.usuario?.nombre}</td>
              <td className="p-2">{i.estadoEntrega || "PENDIENTE"}</td>
              <td className="p-2">{i.estadoAprobacion || "Sin evaluar"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
