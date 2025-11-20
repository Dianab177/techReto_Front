import { useState } from "react";
import type { FormEvent } from "react";
import { entregarReto } from "../services/inscripcionService";

interface EntregaRetoFormProps {
  idInscripcion: string | number;
}

export default function EntregaRetoForm({
  idInscripcion,
}: EntregaRetoFormProps) {
  const [repo, setRepo] = useState("");
  const [figma, setFigma] = useState("");
  const [demo, setDemo] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await entregarReto(Number(idInscripcion), {
      enlaceRepositorio: repo,
      enlaceFigma: figma,
      enlaceDemo: demo,
    });

    alert("Entrega enviada correctamente");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enlace repositorio"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enlace Figma"
        value={figma}
        onChange={(e) => setFigma(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enlace demo"
        value={demo}
        onChange={(e) => setDemo(e.target.value)}
      />

      <button>Entregar reto</button>
    </form>
  );
}
