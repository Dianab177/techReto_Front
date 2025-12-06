import { useEffect, useState } from "react";
import { getRetosEmpresa } from "../services/retoServices";
import { getInscripcionesPorReto } from "../services/inscripcionService";
import { useAuth } from "../hooks/useAuth";

import type { Reto } from "../types/Reto";
import type { Inscripcion } from "../types/Inscripcion";

export default function InscripcionesEmpresaPage() {
  const { user } = useAuth();

  const [retos, setRetos] = useState<Reto[]>([]);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [retoSeleccionado, setRetoSeleccionado] = useState<number | null>(null);

  // ===============================
  // Cargar retos de la empresa
  // ===============================
  useEffect(() => {
    if (!user?.idUsuario) return; // evita undefined

    getRetosEmpresa(user.idUsuario)
      .then((data) => setRetos(data))
      .catch((err) => console.error("Error cargando retos:", err));
  }, [user]);

  // ===============================
  // Cargar inscripciones por reto
  // ===============================
  const cargarInscripciones = async (idReto: number) => {
    try {
      const data = await getInscripcionesPorReto(idReto);
      setInscripciones(data);
      setRetoSeleccionado(idReto);
    } catch (err) {
      console.error("Error obteniendo inscripciones:", err);
    }
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inscripciones</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* ----------------------- */}
        {/* LISTA DE RETOS PUBLICADOS */}
        {/* ----------------------- */}
        <div className="space-y-2">
          <h3 className="font-semibold">Mis retos</h3>

          {retos.length === 0 && (
            <p className="text-gray-400">No tienes retos publicados.</p>
          )}

          {retos.map((r: Reto) => (
            <button
              key={r.idReto}
              onClick={() => cargarInscripciones(r.idReto!)}
              className={`w-full text-left px-3 py-2 rounded-md border ${
                retoSeleccionado === r.idReto
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-slate-800 dark:text-gray-200"
              }`}
            >
              {r.titulo}
            </button>
          ))}
        </div>

        {/* ----------------------- */}
        {/* INSCRIPCIONES DEL RETO */}
        {/* ----------------------- */}
        <div className="col-span-2">
          <h3 className="font-semibold mb-2">Inscripciones</h3>

          {retoSeleccionado === null && (
            <p className="text-gray-400">Selecciona un reto</p>
          )}

          {retoSeleccionado !== null && inscripciones.length === 0 && (
            <p className="text-gray-400">
              Este reto aún no tiene inscripciones.
            </p>
          )}

          {inscripciones.length > 0 && (
            <ul className="space-y-3">
              {inscripciones.map((i: Inscripcion) => (
                <li
                  key={i.idInscripcion}
                  className="p-3 rounded bg-slate-800 text-white border border-slate-600"
                >
                  <p>
                    <strong>Participante:</strong> {i.usuario?.nombre}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {i.fechaInscripcion}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
