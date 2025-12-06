import type { Inscripcion } from "./Inscripcion";

export interface Evaluacion {
  idEvaluacion: number;
  nota: number;
  comentario: string;
  estado: string;
  fechaEvaluacion: string;

  inscripcion: Inscripcion | null;
}
