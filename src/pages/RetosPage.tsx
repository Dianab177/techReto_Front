import { useEffect, useState } from "react";
import { getRetos, getRetosEmpresa } from "../services/retoServices";
import type { Reto } from "../types/Reto";
import RetoCard from "../components/RetoCard";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";

export default function RetosPage() {
  const { user } = useAuth();
  const [retos, setRetos] = useState<Reto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        let data;

        if (user?.rol === "EMPRESA") {
          data = await getRetosEmpresa(Number(user.idUsuario));
        } else {
          data = await getRetos();
        }

        setRetos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === "object" && err && "response" in err) {
          const axiosErr = err as {
            response?: { data?: { message?: string } };
          };
          setError(axiosErr.response?.data?.message || "Error cargando retos");
        } else {
          setError("Error cargando retos");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {retos.map((r) => (
        <RetoCard key={r.idReto} reto={r} />
      ))}
    </section>
  );
}
