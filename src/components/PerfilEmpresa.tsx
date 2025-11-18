import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import type { Reto } from "../types/Reto";
import type { Inscripcion } from "../types/Inscripcion";
import Loader from "../components/Loader";

export default function PerfilEmpresa() {
  const { user } = useAuth();

  const [retos, setRetos] = useState<Reto[]>([]);
  const [loading, setLoading] = useState(true);
  const [seleccionado, setSeleccionado] = useState<number | null>(null);

  // ================================================================
  //   Cargar retos + inscripciones de la empresa
  // ================================================================
  useEffect(() => {
    if (!user?.idUsuario) return;

    (async () => {
      try {
        const { data } = await api.get(
          `/retos/empresa/${user.idUsuario}/inscripciones`
        );

        setRetos(data);
      } catch (err) {
        console.error("Error cargando retos de empresa:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <section className="max-w-5xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Panel de empresa</h2>

      {/* =============================
          LISTA DE RETOS
      ============================== */}
      <h3 className="text-xl font-semibold mb-2">Retos creados</h3>

      {retos.length === 0 && (
        <p className="text-gray-400">No has creado ningún reto todavía.</p>
      )}

      <ul className="mb-6">
        {retos.map((r) => (
          <li
            key={r.idReto}
            onClick={() => setSeleccionado(r.idReto)}
            className={`cursor-pointer p-3 rounded mb-2 border 
              ${seleccionado === r.idReto ? "bg-slate-700" : "bg-slate-800"}`}
          >
            <strong>{r.titulo}</strong> — {r.estado || "EN CURSO"}
          </li>
        ))}
      </ul>

      {/* =============================
          PARTICIPANTES
      ============================== */}
      {seleccionado && (
        <>
          <h3 className="text-xl font-semibold mb-4">Participantes del reto</h3>

          {retos.find((r) => r.idReto === seleccionado)?.inscripciones
            ?.length ? (
            retos
              .find((r) => r.idReto === seleccionado)!
              .inscripciones!.map((i: Inscripcion) => (
                <div
                  key={i.idInscripcion}
                  className="bg-slate-800 p-4 rounded mb-3"
                >
                  <p>
                    <strong>Participante:</strong> {i.usuario?.nombre}
                  </p>

                  <p>
                    <strong>Entrega:</strong> {i.estadoEntrega || "PENDIENTE"}
                  </p>

                  <p>
                    <strong>Evaluación:</strong>{" "}
                    {i.estadoAprobacion || "Sin evaluar"}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-gray-400">
              No hay inscripciones para este reto.
            </p>
          )}
        </>
      )}
    </section>
  );
}
