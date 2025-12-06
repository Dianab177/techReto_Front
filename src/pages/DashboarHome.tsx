import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Reto } from "../types/Reto";
import RetoCard from "../components/RetoCard";
import Loader from "../components/Loader";

export default function DashboardHome() {
  const { user } = useAuth();
  const [retos, setRetos] = useState<Reto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarRetos();
  }, []);

  const cargarRetos = async () => {
    try {
      setLoading(true);
      const response = await api.get<Reto[]>("/retos");
      const retosAbiertos = response.data
        .filter((r) => r.estado === "ABIERTO")
        .slice(0, 3);
      setRetos(retosAbiertos);
      console.log("Retos cargados:", retosAbiertos.length);
    } catch (error) {
      console.error("❌ Error cargando retos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto py-16 px-6">
        {/* Título principal */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold text-white mb-4">
            Retos reales para talento real
          </h1>

          <p className="text-lg text-gray-300 mb-8">
            {user?.rol === "EMPRESA"
              ? "Crea retos y descubre talento real evaluando habilidades a través de desafíos prácticos."
              : "Participa en retos de empresas, colabora en equipo y construye tu portfolio."}
          </p>

          {/* Botón principal - AMARILLO DORADO como el logo */}
          <Link
            to="/retos"
            className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            Explorar Retos
          </Link>
        </div>

        {/* Stats con bordes */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
              <div className="py-6 text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-gray-400">Retos Activos</div>
              </div>
              <div className="py-6 text-center">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-gray-400">Participantes</div>
              </div>
              <div className="py-6 text-center">
                <div className="text-3xl font-bold text-white">30+</div>
                <div className="text-gray-400">Empresas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Retos Destacados */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Retos Destacados
            </h2>
            <p className="text-gray-300">
              Los retos más populares disponibles ahora
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : retos.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/30 rounded-lg border border-white/10">
              <p className="text-gray-400">
                No hay retos disponibles en este momento
              </p>
            </div>
          ) : (
            <>
              {/* Cards de retos */}
              <div className="space-y-6">
                {retos.map((reto) => (
                  <RetoCard key={reto.idReto} reto={reto} />
                ))}
              </div>

              {/* Botón ver todos - BORDE AMARILLO */}
              <div className="text-center mt-8">
                <Link
                  to="/retos"
                  className="inline-flex items-center px-6 py-3 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900 font-semibold rounded-lg transition-all"
                >
                  Ver Todos los Retos
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Cómo Funciona - Con iconos en círculos amarillos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              1. Explora Retos
            </h3>
            <p className="text-gray-400">
              Descubre desafíos de empresas reales
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              2. Colabora en Equipo
            </h3>
            <p className="text-gray-400">Trabaja con otros participantes</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              3. Construye tu Portfolio
            </h3>
            <p className="text-gray-400">Demuestra tus habilidades</p>
          </div>
        </div>
      </section>
    </div>
  );
}
