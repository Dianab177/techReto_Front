import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import InfoApp from "../components/InfoApp";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <section className="max-w-5xl mx-auto py-16 px-6 text-white">
      <h1 className="text-5xl font-bold mb-4">
        Retos reales para talento real
      </h1>
      <InfoApp />
      {/* TEXTO SEGÚN EL ROL */}
      {user?.rol === "EMPRESA" ? (
        <p className="text-lg text-gray-300 mb-8">
          Crea retos y descubre talento real evaluando habilidades a través de
          desafíos prácticos.
        </p>
      ) : (
        <p className="text-lg text-gray-300 mb-8">
          Participa en retos de empresas, colabora en equipo y construye tu
          portfolio.
        </p>
      )}

      <div className="flex items-center gap-6 text-lg">
        <Link
          to="/retos"
          className="text-blue-400 underline hover:text-blue-300"
        >
          Ver retos
        </Link>

        {/* Si NO se está logueado */}
        {!user && (
          <>
            <Link
              to="/register"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Crear cuenta
            </Link>

            <Link
              to="/login"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Iniciar sesión
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
