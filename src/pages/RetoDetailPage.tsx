import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { getReto } from "../services/retoServices";
import { inscribirse } from "../services/inscripcionService";

import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import TablaInscripciones from "../components/organisms/TablaInscripciones"; // ✅ IMPORTACIÓN CORRECTA

import type { Reto } from "../types/Reto";

export default function RetoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reto, setReto] = useState<Reto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await getReto(Number(id));
        setReto(data);
      } catch (err: unknown) {
        console.error("Error cargando reto:", err);
        if (err instanceof Error) setError(err.message);
        else setError("Error cargando el reto");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleInscribirse = async () => {
    if (!user) {
      Swal.fire(
        "Debes iniciar sesión",
        "Inicia sesión para inscribirte",
        "warning"
      );
      navigate("/login");
      return;
    }

    try {
      await inscribirse(user.idUsuario!, Number(id));
      Swal.fire("¡Inscripción realizada!", "", "success");
    } catch (err) {
      console.error("Error al inscribirse:", err);
      Swal.fire("Error", "No se pudo realizar la inscripción", "error");
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!reto) return <div>No se encontró el reto</div>;

  return (
    <section className="p-6 bg-slate-900 text-white rounded-lg max-w-4xl mx-auto mt-6 shadow-lg">
      <h2 className="text-3xl font-bold mb-2">{reto.titulo}</h2>
      <p className="text-gray-300 mb-4">{reto.descripcion}</p>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
        <p>
          <strong>Tipo:</strong> {reto.tipo}
        </p>
        <p>
          <strong>Estado:</strong> {reto.estado}
        </p>
        <p>
          <strong>Recompensa:</strong> {reto.recompensa}
        </p>
        <p>
          <strong>Fecha inicio:</strong> {reto.fechaInicio || "No especificada"}
        </p>
        <p>
          <strong>Fecha fin:</strong> {reto.fechaFin || "No especificada"}
        </p>
      </div>

      {reto.empresa && (
        <div className="mt-5 border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold">Empresa</h3>
          <p>
            <strong>Nombre:</strong> {reto.empresa.nombre}
          </p>
          <p>
            <strong>Email:</strong> {reto.empresa.email}
          </p>
        </div>
      )}

      {user?.rol === "PARTICIPANTE" && (
        <button
          onClick={handleInscribirse}
          className="mt-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
        >
          Inscribirme en este reto
        </button>
      )}

      {user?.rol === "EMPRESA" && (
        <div className="mt-10">
          <TablaInscripciones idReto={reto.idReto} />
        </div>
      )}
    </section>
  );
}
