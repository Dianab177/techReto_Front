import type { Inscripcion } from "./Inscripcion";

export interface Evaluacion {
  idEvaluacion: number;
  nota: number;
  comentario: string;

  estado: "PENDIENTE" | "APROBADA" | "RECHAZADA"; 

  fechaEvaluacion: string;

  inscripcion: Inscripcion | null;
}
