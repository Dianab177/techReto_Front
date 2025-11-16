import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReto } from "../services/retoServices";
import {
  inscribirse,
  getInscripcionesUsuario,
} from "../services/inscripcionService";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import type { Reto } from "../types/Reto";
import type { Inscripcion } from "../types/Inscripcion";
import Loader from "../components/Loader";
import type { AxiosError } from "axios";

export default function RetoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reto, setReto] = useState<Reto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [yaInscrito, setYaInscrito] = useState(false);

  // ===============================
  // CARGAR RETO
  // ===============================
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await getReto(Number(id));
        setReto(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error cargando el reto");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // ===============================
  // COMPROBAR SI YA ESTÁ INSCRITA
  // ===============================
  const userId = user?.idUsuario;

  useEffect(() => {
    if (!userId || !id) return;

    (async () => {
      try {
        const data = await getInscripcionesUsuario(userId);
        const retoId = Number(id);
        const inscrito = data.some(
          (i: Inscripcion) => i.reto?.idReto === retoId
        );

        setYaInscrito(inscrito);
      } catch (err) {
        console.error("Error verificando inscripción:", err);
      }
    })();
  }, [userId, id]);

  // ===============================
  // INSCRIBIRSE
  // ===============================

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
      Swal.fire("¡Te has inscrito con éxito!", "", "success");
    } catch (err: unknown) {
      const error = err as AxiosError<string>;
      console.error("Error al inscribirse:", error);

      const backendMessage = error.response?.data;

      if (backendMessage === "El usuario ya está inscrito") {
        Swal.fire(
          "Ya estás inscrita",
          "No puedes volver a apuntarte a un reto en el que ya participaste.",
          "info"
        );
        return;
      }

      Swal.fire(
        "No se pudo realizar la inscripción",
        "Ocurrió un error inesperado.",
        "error"
      );
    }
  };

  // ===============================
  // RENDER
  // ===============================
  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!reto) return <div>No se encontró el reto</div>;

  return (
    <section className="p-6 bg-slate-900 text-white rounded-lg max-w-3xl mx-auto mt-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{reto.titulo}</h2>
      <p className="mb-4 text-gray-300">{reto.descripcion}</p>

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
        <div className="mt-4 border-t border-gray-700 pt-3">
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
        <>
          {!yaInscrito ? (
            <button
              onClick={handleInscribirse}
              className="mt-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
            >
              Inscribirme en este reto
            </button>
          ) : (
            <p className="mt-6 text-emerald-400 font-semibold">
              ✔ Ya estás inscrita en este reto
            </p>
          )}
        </>
      )}
    </section>
  );
}
