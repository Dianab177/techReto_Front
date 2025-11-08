import { Link } from "react-router-dom";
import type { Reto } from "../types/Reto";

export default function RetoCard({ reto }: { reto: Reto }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{reto.titulo}</h3>
        {reto.estado && (
          <span className="text-xs px-2 py-1 rounded bg-slate-100 border">{reto.estado}</span>
        )}
      </div>
      <p className="text-sm text-slate-600 mt-2 line-clamp-3">{reto.descripcion}</p>
      <Link to={`/retos/${reto.id_reto}`} className="inline-block mt-3 text-sm text-blue-700">
        Ver detalle →
      </Link>
    </div>
  );
}
