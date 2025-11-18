import type { Inscripcion } from "./Inscripcion";

export interface Reto {
  idReto: number;

  titulo: string;
  descripcion: string;

  tipo: "INDIVIDUAL" | "EQUIPO";
  estado: "ABIERTO" | "EN_CURSO" | "CERRADO";

  recompensa?: string;

  fechaInicio?: string;
  fechaFin?: string;

  empresa?: {
    idUsuario: number;
    nombre: string;
    email: string;
  };

 
  inscripciones?: Inscripcion[];
}
