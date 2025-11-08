import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold">Retos reales para talento real</h1>
        <p className="mt-3 text-slate-600">
          Participa en retos de empresas, colabora en equipo y construye tu portfolio.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/retos" className="px-4 py-2 rounded bg-slate-900 text-white">Ver retos</Link>
          <Link to="/register" className="px-4 py-2 rounded border">Crear cuenta</Link>
        </div>
      </div>
    </section>
  );
}
