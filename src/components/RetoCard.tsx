import { Link } from "react-router-dom";
import type { Reto } from "../types/Reto";

export default function RetoCard({ reto }: { reto: Reto }) {
  return (
    <article className="bg-white p-4 rounded shadow-md hover:shadow-lg transition">
      <h3 className="font-bold text-lg text-slate-900">{reto.titulo}</h3>
      <p className="text-gray-700 text-sm mt-1">{reto.descripcion}</p>

      <div className="mt-3 text-xs text-gray-500">
        <p>Tipo: {reto.tipo}</p>
        <p>Estado: {reto.estado}</p>
        <p>Recompensa: {reto.recompensa}</p>
      </div>

      <Link
        to={`/retos/${reto.idReto}`}
        className="inline-block mt-4 px-3 py-1 bg-slate-900 text-white rounded text-sm hover:bg-slate-700"
      >
        Ver descripción
      </Link>
    </article>
  );
}
