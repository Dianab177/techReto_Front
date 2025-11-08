import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReto } from "../services/retoServices";
import type { Reto } from "../types/Reto";
import Loader from "../components/Loader";

export default function RetoDetailPage() {
  const { id } = useParams();
  const [reto, setReto] = useState<Reto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setReto(await getReto(Number(id)));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === "object" && err && "response" in err) {
          const axiosErr = err as { response?: { data?: { message?: string } } };
          setError(axiosErr.response?.data?.message || "Error cargando reto");
        } else {
          setError("Error cargando reto");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!reto) return <div>No encontrado</div>;

  return (
    <article className="bg-white rounded-lg border p-4">
      <h2 className="text-2xl font-bold">{reto.titulo}</h2>
      <p className="mt-2 text-slate-700 whitespace-pre-line">{reto.descripcion}</p>
    </article>
  );
}
