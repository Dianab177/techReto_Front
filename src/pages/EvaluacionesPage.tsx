import { useEffect, useState } from "react";
import { getTodasInscripcionesAdmin } from "../services/inscripcionService";
import type { Inscripcion } from "../types/Inscripcion";
import Loader from "../components/Loader";

export default function EvaluacionesPage() {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTodasInscripcionesAdmin();
        setInscripciones(data);
      } catch (err) {
        console.error("Error cargando evaluaciones:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Evaluaciones</h1>

      {inscripciones.length === 0 ? (
        <p className="text-gray-600">No hay inscripciones evaluables.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Reto</th>
              <th className="p-2">Participante</th>
              <th className="p-2">Entrega</th>
              <th className="p-2">Estado Empresa</th>
            </tr>
          </thead>

          <tbody>
            {inscripciones.map((i) => (
              <tr key={i.idInscripcion} className="border-t">
                <td className="p-2">{i.reto?.titulo}</td>
                <td className="p-2">{i.usuario?.nombre}</td>
                <td className="p-2">{i.estadoEntrega ?? "PENDIENTE"}</td>
                <td className="p-2">{i.estadoAprobacion ?? "Sin evaluar"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
