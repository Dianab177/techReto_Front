import { useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

export default function CrearRetoPage() {
  const { user } = useAuth();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("INDIVIDUAL");
  const [estado, setEstado] = useState("ABIERTO");
  const [recompensa, setRecompensa] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const crearReto = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/retos", {
        titulo,
        descripcion,
        tipo,
        estado,
        recompensa,
        fechaInicio,
        fechaFin,
        empresa: { idUsuario: Number(user!.idUsuario) },
      });

      Swal.fire("Reto creado con éxito", "", "success");

      setTitulo("");
      setDescripcion("");
      setRecompensa("");
      setFechaInicio("");
      setFechaFin("");
    } catch {
      Swal.fire("Error creando reto", "", "error");
    }
  };

  return (
    <section className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Crear nuevo reto</h1>

      <form
        onSubmit={crearReto}
        className="space-y-3 bg-white dark:bg-slate-800 p-4 rounded"
      >
        <input
          className="w-full border p-2 rounded"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            className="border p-2 rounded"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="INDIVIDUAL">Individual</option>
            <option value="EQUIPO">Equipo</option>
          </select>

          <select
            className="border p-2 rounded"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="ABIERTO">Abierto</option>
            <option value="EN_CURSO">En curso</option>
            <option value="CERRADO">Cerrado</option>
          </select>
        </div>

        <input
          className="w-full border p-2 rounded"
          placeholder="Recompensa"
          value={recompensa}
          onChange={(e) => setRecompensa(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            className="border p-2 rounded"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Crear reto
        </button>
      </form>
    </section>
  );
}
