import { useAuth } from "../hooks/useAuth";

export default function PerfilEmpresa() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="text-white p-6 bg-slate-900 rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Perfil de empresa</h2>

      <p>
        <strong>Nombre:</strong> {user.nombre}
      </p>
      <p>
        <strong>Correo:</strong> {user.email}
      </p>
      <p>
        <strong>Rol:</strong> {user.rol}
      </p>

      <p className="mt-2 text-gray-400 text-sm">
        Esta es la información de tu cuenta. La gestión de retos y las
        inscripciones están en el menú lateral.
      </p>
    </section>
  );
}
