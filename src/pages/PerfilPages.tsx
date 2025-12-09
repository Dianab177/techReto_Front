import { useAuth } from "../hooks/useAuth";
import PerfilEmpresa from "../components/PerfilEmpresa";

import CompetenciaBadge from "../components/CompetenciaBadge";
import { parseCompetencias } from "../utils/parseCompetencias";

export default function PerfilPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <section className="p-6 bg-slate-900 text-white rounded-lg max-w-5xl mx-auto mt-6 shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Perfil</h2>

      <div className="mb-6 text-gray-200">
        <p>
          <strong>Nombre:</strong> {user?.nombre}
        </p>
        <p>
          <strong>Correo:</strong> {user?.email}
        </p>
        <p>
          <strong>Rol:</strong> {user?.rol}
        </p>

        {user.rol === "PARTICIPANTE" && (
          <div className="mt-4">
            <strong>Competencias:</strong>

            {parseCompetencias(user.competencias ?? undefined).length === 0 ? (
              <p className="text-gray-400 mt-1 text-sm">
                No has indicado competencias
              </p>
            ) : (
              <div className="mt-2 flex flex-wrap">
                {parseCompetencias(user.competencias ?? undefined).map(
                  (skill, idx) => (
                    <CompetenciaBadge key={idx} skill={skill} />
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <hr className="my-6 border-gray-700" />

      {/* SOLO EMPRESA */}
      {user.rol === "EMPRESA" && <PerfilEmpresa />}
    </section>
  );
}
