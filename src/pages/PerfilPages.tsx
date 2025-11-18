import { useAuth } from "../hooks/useAuth";
import MisRetos from "../components/MisRetos";
import PerfilEmpresa from "../components/PerfilEmpresa";

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
      </div>

      <hr className="my-6 border-gray-700" />

      {user.rol === "PARTICIPANTE" && <MisRetos />}
      {user.rol === "EMPRESA" && <PerfilEmpresa />}
    </section>
  );
}
