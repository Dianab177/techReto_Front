import { useEffect, useState } from "react";
import { getRetos } from "../services/retoServices"; // ✅ asegúrate de que el archivo se llama retoService.ts (sin la “s” final)
import type { Reto } from "../types/Reto";
import RetoCard from "../components/RetoCard";
import Loader from "../components/Loader";

export default function RetosPage() {
  const [retos, setRetos] = useState<Reto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getRetos();
        setRetos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // Error genérico de JS
          setError(err.message);
        } else if (typeof err === "object" && err && "response" in err) {
          // Error de Axios (HTTP)
          const axiosErr = err as { response?: { data?: { message?: string } } };
          setError(axiosErr.response?.data?.message || "Error cargando retos");
        } else {
          setError("Error cargando retos");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {retos.map((r) => (
        <RetoCard key={r.id_reto} reto={r} />
      ))}
    </section>
  );
}
