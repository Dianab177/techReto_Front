import type { Inscripcion } from "./Inscripcion";

export interface Reto {
  idReto: number;
  titulo: string;
  descripcion: string;

  tipo?: "INDIVIDUAL" | "EQUIPO" | string;
  estado?: "ABIERTO" | "EN_CURSO" | "CERRADO" | string;

  recompensa?: string;
  fechaInicio?: string;
  fechaFin?: string;

  empresa?: {
    idUsuario: number;
    nombre: string;
    email?: string;
  };

  // Para PerfilEmpresa (si alguna vez llega con inscripciones embebidas)
  inscripciones?: Inscripcion[];

  // 🔹 Nuevo: si el reto está bloqueado por admin
  bloqueado?: boolean;
}
