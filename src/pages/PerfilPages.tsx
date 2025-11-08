import { useAuth } from "../hooks/useAuth";

export default function PerfilPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <section className="max-w-xl">
      <h2 className="text-2xl font-bold">Perfil</h2>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <span className="text-slate-500">Nombre</span><span className="col-span-2">{user.nombre}</span>
        <span className="text-slate-500">Correo</span><span className="col-span-2">{user.email}</span>
        <span className="text-slate-500">Rol</span><span className="col-span-2">{user.rol}</span>
      </div>
    </section>
  );
}
