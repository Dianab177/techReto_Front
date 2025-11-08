import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="text-slate-600 mb-6 max-w-md">
        Lo sentimos, la página que buscas no existe o fue movida.  
        Comprueba la URL o vuelve al inicio.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
